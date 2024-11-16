"use client"

import React, { useEffect, useMemo, useState,useRef } from "react"
import { useDataTable } from "@/hooks/use-data-table"
import { DataTable } from "@/components/data-table/data-table"
import { DataTableAdvancedToolbar } from "@/components/data-table/data-table-advanced-toolbar"
import { DataTableToolbar } from "@/components/data-table/data-table-toolbar"
import { toSentenceCase } from "@/lib/utils"
import { getPriorityIcon, getStatusIcon } from "../_lib/utils"
import { DeleteTasksDialog } from "./delete-tasks-dialog"
import { useFeatureFlags } from "./feature-flags-provider"
import { getColumns } from "./tasks-table-columns"
import { TasksTableFloatingBar } from "./tasks-table-floating-bar"
import { TasksTableToolbarActions } from "./tasks-table-toolbar-actions"
import { UpdateTaskSheet } from "./update-task-sheet"
import { getList } from "../_lib/queries"
import { useSelector } from "react-redux"
import { usePathname, useRouter,useSearchParams } from 'next/navigation';
import { searchParamsCache } from "../_lib/validations"

const LABEL_VALUES = ["bug", "feature", "enhancement", "documentation"]
const STATUS_VALUES = ["EXAM-001", "EVENT-002", "ASSIGNMENT-003"]
const lables = {
  "EXAM-001":"EXAM",
  "EVENT-002":"EVENT",
  "ASSIGNMENT-003":"ASSIGNMENT"
}
const PRIORITY_VALUES = ["low", "medium", "high"]

const filterList = [
  [
    {
      id: "name",
      label: "Name",
      type: "text",
    }
  ],
  [
    {
      id: "name",
      label: "Name",
      type: "text",
    },
    {
      id: "email",
      label: "Email",
      type: "text",
    }
  ],
  [
    {
      id: "name",
      label: "Name",
      type: "text",
    },
    {
      id: "nameAmphitheater",
      label: "Amphitheater",
      type: "text",
    },
    {
      id: "location",
      label: "Location",
      type: "text",
    }
  ],
  [
    {
      id: "name",
      label: "Name",
      type: "text",
    },
    {
      id: "owner",
      label: "Owner",
      type: "text",
    },
    {
      id: "type",
      label: "Type",
      type: "multi-select",
      options: STATUS_VALUES.map((status) => ({
        label: lables[status],
        value: status,
      })),
    },
    {
      id: "location",
      label: "Location",
      type: "text",
    }
  ]
]


export function TasksTable({
  searchAs
}) {

  // console.log("TasksTablesss")
  const router = useRouter();
	const pathname = usePathname();
  
  let search=searchAs;

  const { featureFlags } = useFeatureFlags()
  // console.log("bbbbbbb",pathname)

  const [data, setData] = useState(null);
  const [pageCount, setPageCount] = useState(null);
  const [loading, setLoading] = useState(true);
  const [loadingDelete, setLoadingDelete] = useState(false);
  const selected = useSelector((state) => state.adminContent.selectedContent);
  

  const prevValueRef = useRef(-1);
  let loadings;
  
  if (prevValueRef.current != selected){
    loadings = true;
  }else{
    loadings = false;
  }

  useEffect(() => {
    if(true){
      console.log("aaaaa")
      const fetchData = async () => {
        try {
          const result = await getList(search,selected);
          setData(result.metadata.data);
          setPageCount(result.metadata.pageCount);
          // setLoading(false);
          setLoadingDelete(false);
          prevValueRef.current= selected;
  
        } catch (err) {
          return err;
        }
      };
  
      fetchData();
      // console.log("ffffff")
    }
  }, [search,selected,loadingDelete]);

  const [rowAction, setRowAction] = useState(null);


  const columns = useMemo(() => {
    return getColumns({ setRowAction,selected })
  }, [setRowAction,selected])

  const filterFields = [
    {
      id: "title",
      label: "Title",
      placeholder: "Filter titles...",
    },
  ]
  
  const advancedFilterFields = filterList[selected];

  const enableAdvancedTable = featureFlags.includes("advancedTable")
  const enableFloatingBar = featureFlags.includes("floatingBar")

  const { table } = useDataTable({
    data,
    columns,
    pageCount,
    filterFields,
    enableAdvancedFilter: enableAdvancedTable,
    initialState: {
      sorting: [],
      columnPinning: { right: ["actions"] },
    },
    getRowId: (originalRow, index) => `${originalRow.id}-${index}`,
    shallow: false,
    clearOnDefault: true,
  })

  if (loadings) {
    return (
      <h1>Loading...</h1>
    );
  }
  // return (
  //   <h1>Comple...</h1>
  // );

  return (
    <>
      <DataTable
        table={table}
        floatingBar={
          enableFloatingBar ? <TasksTableFloatingBar table={table} /> : null
        }
      >
        {enableAdvancedTable ? (
          <DataTableAdvancedToolbar
            table={table}
            filterFields={advancedFilterFields}
            shallow={false}
          >
            <TasksTableToolbarActions table={table} setLoadingDelete={setLoadingDelete} />
          </DataTableAdvancedToolbar>
        ) : (
          <DataTableToolbar table={table} filterFields={filterFields}>
            <TasksTableToolbarActions table={table} setLoadingDelete={setLoadingDelete} />
          </DataTableToolbar>
        )}
      </DataTable>
      <UpdateTaskSheet
        open={rowAction?.type === "update"}
        onOpenChange={() => setRowAction(null)}
        task={rowAction?.row.original ?? null}
      />
      <DeleteTasksDialog
        open={rowAction?.type === "delete"}
        onOpenChange={() => {
              // router.refresh();
              setLoadingDelete(true);
              setRowAction(null);
          }}
        tasks={rowAction?.row.original ? [rowAction?.row.original] : []}
        showTrigger={false}
        onSuccess={() => rowAction?.row.toggleSelected(false)}
      />
    </>
  )
}
