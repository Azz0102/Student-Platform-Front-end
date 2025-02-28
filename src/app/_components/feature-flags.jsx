"use client"

import * as React from "react"
import { useQueryState } from "nuqs"

import { dataTableConfig } from "@/config/data-table"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"



const TasksTableContext = React.createContext<TasksTableContextProps>({
  featureFlags: [],
  setFeatureFlags: () => {},
})

export function useTasksTable() {
  const context = React.useContext(TasksTableContext)
  if (!context) {
    throw new Error("useTasksTable must be used within a TasksTableProvider")
  }
  return context
}

export function TasksTableProvider({ children }) {
  const [featureFlags, setFeatureFlags] = useQueryState(
    "featureFlags",
    {
      defaultValue: [],
      parse: (value) => value.split(","),
      serialize: (value) => value.join(","),
      eq: (a, b) =>
        a.length === b.length && a.every((value, index) => value === b[index]),
      clearOnDefault: true,
    }
  )

  return (
    <TasksTableContext.Provider
      value={{
        featureFlags,
        setFeatureFlags: (value) => void setFeatureFlags(value),
      }}
    >
      <div className="w-full overflow-x-auto">
        <ToggleGroup
          type="multiple"
          variant="outline"
          size="sm"
          value={featureFlags}
          onValueChange={(value) => setFeatureFlags(value)}
          className="w-fit"
        >
          {dataTableConfig.featureFlags.map((flag) => (
            <TooltipProvider key={flag.value}>
              <Tooltip key={flag.value}>
                <ToggleGroupItem
                  value={flag.value}
                  className="whitespace-nowrap px-3 text-xs"
                  asChild
                >
                  <TooltipTrigger>
                    <flag.icon
                      className="mr-2 size-3.5 shrink-0"
                      aria-hidden="true"
                    />
                    {flag.label}
                  </TooltipTrigger>
                </ToggleGroupItem>
                <TooltipContent
                  align="start"
                  side="bottom"
                  sideOffset={6}
                  className="flex max-w-60 flex-col space-y-1.5 border bg-background py-2 font-semibold text-foreground"
                >
                  <div>{flag.tooltipTitle}</div>
                  <div className="text-xs text-muted-foreground">
                    {flag.tooltipDescription}
                  </div>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          ))}
        </ToggleGroup>
      </div>
      {children}
    </TasksTableContext.Provider>
  )
}
