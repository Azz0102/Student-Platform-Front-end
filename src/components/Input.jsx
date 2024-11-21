
import * as React from "react"
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils"
import { DateField, DateInput, DateSegment } from "react-aria-components";
import { DateTime } from "luxon";
import {parseAbsolute,parseAbsoluteToLocal} from '@internationalized/date';
import { ArrowRight, Search } from "lucide-react";
import { useQueryState } from 'nuqs'
import { useDispatch, useSelector } from "react-redux";
import { setClassSession, setSessionDetail } from "@/lib/features/adminContentSlice";


const Input01= React.forwardRef(({ className, ...props }, ref) => {
  console.log("props",props)

  return (
    <div >
      {/* <Label htmlFor="input-01">Simple input</Label> */}
      <Input ref={ref} value={props.value ??""} onChange={props.onChange} id="input-01" type={props.type} />
      {/* <p className="mt-2 text-xs text-destructive" role="alert" aria-live="polite">
        User is not found
      </p> */}
    </div>
  );
}
)

const  Input40= React.forwardRef(({ className, ...props }, ref) => {
  const value = props.value ?? "2024-11-16T08:48:48.000Z";
 
  let [date, setDate] = React.useState(parseAbsoluteToLocal(value));
  // console.log("parseAbsoluteToLocal",parseAbsoluteToLocal(props.value))
  // const { calendar, ...dateWithoutCalendar } = date;
  // const parsedDate = {
  //   year: 2024,
  //   month: 10,
  //   day: 15,
  //   hour: 8,
  //   minute: 48,
  //   second: 48
  // };
  return (
    <DateField ref={ref} {...props} value={date} 
        onChange={(newDate)=>{
          setDate(newDate)
          const parsedDate = {
            year: newDate?.year,
            month: newDate?.month,
            day: newDate?.day,
            hour: newDate?.hour,
            minute: newDate?.minute,
            second: newDate?.second
          };
          props.onChange(DateTime.fromObject(parsedDate).toUTC().toISO())
          // newDate && newDate.year && newDate.month && newDate.day && newDate.hour
          // &&newDate.minute&&newDate.second 
          // && console.log("ddddd"); 
          // console.log("aaaaa", DateTime.fromObject(parsedDate).toUTC().toISO())
        }}
       className="space-y-2" granularity="minute" hourCycle={24}>
      {/* <Label className="text-sm font-medium text-foreground">Date and time input</Label> */}
      <DateInput {...props} className="relative inline-flex h-9 w-full items-center overflow-hidden whitespace-nowrap rounded-lg border border-input bg-background px-3 py-2 text-sm shadow-sm shadow-black/5 ring-offset-background transition-shadow data-[focus-within]:border-ring data-[disabled]:opacity-50 data-[focus-within]:outline-none data-[focus-within]:ring-2 data-[focus-within]:ring-ring/30 data-[focus-within]:ring-offset-2">
        {(segment) => (
          <DateSegment
            segment={segment}
            className="inline rounded p-0.5 text-foreground caret-transparent outline outline-0 data-[disabled]:cursor-not-allowed data-[focused]:bg-accent data-[invalid]:data-[focused]:bg-destructive data-[type=literal]:px-0 data-[focused]:data-[placeholder]:text-foreground data-[focused]:text-foreground data-[invalid]:data-[focused]:data-[placeholder]:text-destructive-foreground data-[invalid]:data-[focused]:text-destructive-foreground data-[invalid]:data-[placeholder]:text-destructive data-[invalid]:text-destructive data-[placeholder]:text-muted-foreground/70 data-[type=literal]:text-muted-foreground/70 data-[disabled]:opacity-50"
          />
        )}
      </DateInput>
    </DateField>
  );
}
)


function Input26() {
  const classSession = useSelector((state) => state.adminContent.selectedClassSession);
  const [searchValue, setSearchValue] = React.useState(classSession); // Quản lý trạng thái cho giá trị tìm kiếm

  const dispatch = useDispatch();
  const handleInputChange = (event) => {
    setSearchValue(event.target.value); // Cập nhật giá trị tìm kiếm
  };

  const handleSubmit = (event) => {
    event.preventDefault(); // Ngăn chặn hành vi mặc định
    console.log("Search value submitted:");
    dispatch(setClassSession(searchValue));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-2">
      <div className="relative">
        <Input value={searchValue} onChange={handleInputChange} placeholder="Nhap ten hoc phan..." id="input-26" className="peer pe-9 ps-9" type="search" />
        <button
          className="absolute inset-y-0 end-0 flex h-full w-9 items-center justify-center rounded-e-lg text-muted-foreground/80 ring-offset-background transition-shadow hover:text-foreground focus-visible:border focus-visible:border-ring focus-visible:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/30 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50"
          aria-label="Submit search"
          type="submit"
        >
          <Search size={16} strokeWidth={2} />
        </button>
      </div>
    </form>
  );
}

function Input8() {
  const sessionDetail = useSelector((state) => state.adminContent.selectedSessionDetail);
  
  const [searchValue, setSearchValue] = React.useState(sessionDetail); // Quản lý trạng thái cho giá trị tìm kiếm

  const dispatch = useDispatch();
  const handleInputChange = (event) => {
    setSearchValue(event.target.value); // Cập nhật giá trị tìm kiếm
  };

  const handleSubmit = (event) => {
    event.preventDefault(); // Ngăn chặn hành vi mặc định
    console.log("Search value submitted:");
    dispatch(setSessionDetail(searchValue));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-2">
      <div className="relative">
        <Input value={searchValue} onChange={handleInputChange} placeholder="Nhap Id buoi hoc..." id="input-26" className="peer pe-9 ps-9" type="number" />
        <button
          className="absolute inset-y-0 end-0 flex h-full w-9 items-center justify-center rounded-e-lg text-muted-foreground/80 ring-offset-background transition-shadow hover:text-foreground focus-visible:border focus-visible:border-ring focus-visible:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/30 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50"
          aria-label="Submit search"
          type="submit"
        >
          <Search size={16} strokeWidth={2} />
        </button>
      </div>
    </form>
  );
}


Input01.displayName = "Input01"
Input40.displayName = "Input40"

export  {
    Input01,
    Input40,
    Input26,
    Input8
};



