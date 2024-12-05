"use client"

import { useState, useTransition } from "react"
import { useForm } from "react-hook-form"

import { Icons } from "@/components/icons"
import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

import { Input01, Input40 } from "@/components/Input"
import Minimal from "@/components/Minimal"
import { Credenza, CredenzaClose, CredenzaContent, CredenzaDescription, CredenzaFooter, CredenzaHeader, CredenzaTitle, CredenzaTrigger } from "@/components/ui/credenza"
import { useSelector } from "react-redux"
import { creactTask } from "../_lib/actions"
import { toast } from "sonner"
import { ScrollArea } from "@/components/ui/scroll-area"

// Định nghĩa các giá trị hằng số thay thế cho enum
const LABEL_VALUES = ["bug", "feature", "enhancement", "documentation"]
const AMPHITHEATERS =["Amphitheater A","Amphitheater B"]
const TYPE = ["Theory","Practice"]
const SEMESTER = ["Hoc Ky I Nam 2024","Hoc Ky II Nam 2024"]
const DAY_OF_WEEK =["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]
const GRADE_TYPE = ["Thành phần", "Giữa kỳ","Cuối kỳ"]
const EVENT_TYPE = ["EXAM-001", "EVENT-002", "ASSIGNMENT-003"]
const STATUS_VALUES = ["todo", "in-progress", "done", "canceled"]
const PRIORITY_VALUES = ["low", "medium", "high"]

const Form0 = ({form,onSubmit,isUpdatePending,selected,selectedClassSession})=>{
  switch (selected) {
    case 0:
      return(
        <Form {...form}>
          <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="flex flex-col gap-4"
          >
              <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                  <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                      <Input01 
                        placeholder="Do a kickflip"
                        type="number"
                        {...field}
                      />
                  </FormControl>
                  <FormMessage />
                  </FormItem>
              )}
              />
              <CredenzaFooter className="gap-2 pt-2 sm:space-x-0">
                  <CredenzaClose asChild>
                    <Button type="button" variant="outline">
                      Cancel
                    </Button>
                  </CredenzaClose>
                  <Button disabled={isUpdatePending}>
                    {isUpdatePending && (
                      <Icons.spinner
                        className="mr-2 size-4 animate-spin"
                        aria-hidden="true"
                      />
                    )}
                    Save
                  </Button>
            </CredenzaFooter>
          </form>
        </Form>
      );
    
    case 1:
        return(
          <Form {...form}>
            <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="flex flex-col gap-4"
            >
                <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                    <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                        {/* <Textarea
                        placeholder="Do a kickflip"
                        className="resize-none"
                        {...field}
                        /> */}
                        <Input01 
                          placeholder="Do a kickflip"
                          {...field}
                        />
                    </FormControl>
                    <FormMessage />
                    </FormItem>
                )}
                />
                <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                    <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                        {/* <Textarea
                        placeholder="Do a kickflip"
                        className="resize-none"
                        {...field}
                        /> */}
                        <Input01 
                          placeholder="Do a kickflip"
                          {...field}
                        />
                    </FormControl>
                    <FormMessage />
                    </FormItem>
                )}
                />
                <FormField
                control={form.control}
                name="dateOfBirth"
                render={({ field }) => (
                    <FormItem>
                    <FormLabel>DateOfBirth</FormLabel>
                    <FormControl>
                        <Input40 
                          placeholder="Do a kickflip"
                          {...field}
                        />
                    </FormControl>
                    <FormMessage />
                    </FormItem>
                )}
                />
                <CredenzaFooter className="gap-2 pt-2 sm:space-x-0">
                    <CredenzaClose asChild>
                      <Button type="button" variant="outline">
                        Cancel
                      </Button>
                    </CredenzaClose>
                    <Button disabled={isUpdatePending}>
                      {isUpdatePending && (
                        <Icons.spinner
                          className="mr-2 size-4 animate-spin"
                          aria-hidden="true"
                        />
                      )}
                      Save
                    </Button>
              </CredenzaFooter>
            </form>
          </Form>
        );
    
    case 2:
      return(
        <Form {...form}>
          <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="flex flex-col gap-4"
          >
              <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                  <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                      <Input01 
                        placeholder="Do a kickflip"
                        {...field}
                      />
                  </FormControl>
                  <FormMessage />
                  </FormItem>
              )}
              />
              <FormField
              control={form.control}
              name="type"
              render={({ field }) => (
                  <FormItem>
                  <FormLabel>Type</FormLabel>
                  <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                  >
                      <FormControl>
                      <SelectTrigger className="capitalize">
                          <SelectValue placeholder="Select a Type" />
                      </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                      <SelectGroup>
                          {TYPE.map((item) => (
                          <SelectItem
                              key={item}
                              value={item}
                              className="capitalize"
                          >
                              {item}
                          </SelectItem>
                          ))}
                      </SelectGroup>
                      </SelectContent>
                  </Select>
                  <FormMessage />
                  </FormItem>
              )}
              />
              <FormField
              control={form.control}
              name="capacity"
              render={({ field }) => (
                  <FormItem>
                  <FormLabel>Capacity</FormLabel>
                  <FormControl>
                      <Input01 
                        placeholder="Do a kickflip"
                        type={'number'}
                        {...field}
                      />
                  </FormControl>
                  <FormMessage />
                  </FormItem>
              )}
              />
              <FormField
              control={form.control}
              name="nameAmphitheater"
              render={({ field }) => (
                  <FormItem>
                  <FormLabel>Amphitheater</FormLabel>
                  <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                  >
                      <FormControl>
                      <SelectTrigger className="capitalize">
                          <SelectValue placeholder="Select a Amphitheater" />
                      </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                      <SelectGroup>
                          {AMPHITHEATERS.map((item) => (
                          <SelectItem
                              key={item}
                              value={item}
                              className="capitalize"
                          >
                              {item}
                          </SelectItem>
                          ))}
                      </SelectGroup>
                      </SelectContent>
                  </Select>
                  <FormMessage />
                  </FormItem>
              )}
              />
              <CredenzaFooter className="gap-2 pt-2 sm:space-x-0">
                  <CredenzaClose asChild>
                    <Button type="button" variant="outline">
                      Cancel
                    </Button>
                  </CredenzaClose>
                  <Button disabled={isUpdatePending}>
                    {isUpdatePending && (
                      <Icons.spinner
                        className="mr-2 size-4 animate-spin"
                        aria-hidden="true"
                      />
                    )}
                    Save
                  </Button>
            </CredenzaFooter>
          </form>
        </Form>
      );
    
    case 3:
      return(
        <Form {...form}>
          <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="flex flex-col gap-4"
          >
              <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                  <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                      <Input01 
                        placeholder="Do a kickflip"
                        {...field}
                      />
                  </FormControl>
                  <FormMessage />
                  </FormItem>
              )}
              />
              <FormField
              control={form.control}
              name="content"
              render={({ field }) => (
                  <FormItem>
                  <FormControl>
                    <Minimal {...field} />
                  </FormControl>
                  <FormMessage />
                  </FormItem>
              )}
              />
              <FormField
              control={form.control}
              name="type"
              render={({ field }) => (
                  <FormItem>
                  <FormLabel>Amphitheater</FormLabel>
                  <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                  >
                      <FormControl>
                      <SelectTrigger className="capitalize">
                          <SelectValue placeholder="Select a Type" />
                      </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                      <SelectGroup>
                          {EVENT_TYPE.map((item) => (
                          <SelectItem
                              key={item}
                              value={item}
                              className="capitalize"
                          >
                              {item}
                          </SelectItem>
                          ))}
                      </SelectGroup>
                      </SelectContent>
                  </Select>
                  <FormMessage />
                  </FormItem>
              )}
              />
              <FormField
              control={form.control}
              name="location"
              render={({ field }) => (
                  <FormItem>
                  <FormLabel>Location</FormLabel>
                  <FormControl>
                      <Input01 
                        placeholder="Do a kickflip"
                        {...field}
                      />
                  </FormControl>
                  <FormMessage />
                  </FormItem>
              )}
              />
              <FormField
                control={form.control}
                name="time"
                render={({ field }) => (
                    <FormItem>
                    <FormLabel>Time</FormLabel>
                    <FormControl>
                        <Input40 
                          placeholder="Do a kickflip"
                          {...field}
                        />
                    </FormControl>
                    <FormMessage />
                    </FormItem>
                )}
                />
              <CredenzaFooter className="gap-2 pt-2 sm:space-x-0">
                  <CredenzaClose asChild>
                    <Button type="button" variant="outline">
                      Cancel
                    </Button>
                  </CredenzaClose>
                  <Button disabled={isUpdatePending}>
                    {isUpdatePending && (
                      <Icons.spinner
                        className="mr-2 size-4 animate-spin"
                        aria-hidden="true"
                      />
                    )}
                    Save
                  </Button>
            </CredenzaFooter>
          </form>
        </Form>
      );
    
    case 4:
    return(
      <Form {...form}>
        <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col gap-4"
        >
            <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
                <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                    {/* <Textarea
                    placeholder="Do a kickflip"
                    className="resize-none"
                    {...field}
                    /> */}
                    <Input01 
                      placeholder="Do a kickflip"
                      {...field}
                    />
                </FormControl>
                <FormMessage />
                </FormItem>
            )}
            />
            <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
                <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                    <Input01 
                      placeholder="Do a kickflip"
                      {...field}
                    />
                </FormControl>
                <FormMessage />
                </FormItem>
            )}
            />
            <CredenzaFooter className="gap-2 pt-2 sm:space-x-0">
                <CredenzaClose asChild>
                  <Button type="button" variant="outline">
                    Cancel
                  </Button>
                </CredenzaClose>
                <Button disabled={isUpdatePending}>
                  {isUpdatePending && (
                    <Icons.spinner
                      className="mr-2 size-4 animate-spin"
                      aria-hidden="true"
                    />
                  )}
                  Save
                </Button>
          </CredenzaFooter>
        </form>
      </Form>
    );

    case 5:
      return(
        <Form {...form}>
          <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="flex flex-col gap-4"
          >
              <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                  <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                      <Input01 
                        placeholder="Do a kickflip"
                        {...field}
                      />
                  </FormControl>
                  <FormMessage />
                  </FormItem>
              )}
              />
              <FormField
              control={form.control}
              name="nameSubject"
              render={({ field }) => (
                  <FormItem>
                  <FormLabel>Subject</FormLabel>
                  <FormControl>
                      <Input01 
                        placeholder="Do a kickflip"
                        {...field}
                      />
                  </FormControl>
                  <FormMessage />
                  </FormItem>
              )}
              />
              <FormField
              control={form.control}
              name="nameSemester"
              render={({ field }) => (
                  <FormItem>
                  <FormLabel>Semester</FormLabel>
                  <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                  >
                      <FormControl>
                      <SelectTrigger className="capitalize">
                          <SelectValue placeholder="Select a Semester" />
                      </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                      <SelectGroup>
                          {SEMESTER.map((item) => (
                          <SelectItem
                              key={item}
                              value={item}
                              className="capitalize"
                          >
                              {item}
                          </SelectItem>
                          ))}
                      </SelectGroup>
                      </SelectContent>
                  </Select>
                  <FormMessage />
                  </FormItem>
              )}
              />
              <FormField
                control={form.control}
                name="fromDate"
                render={({ field }) => (
                    <FormItem>
                    <FormLabel>FromDate</FormLabel>
                    <FormControl>
                        <Input40 
                          placeholder="Do a kickflip"
                          {...field}
                        />
                    </FormControl>
                    <FormMessage />
                    </FormItem>
                )}
                />
              <FormField
                control={form.control}
                name="endDate"
                render={({ field }) => (
                    <FormItem>
                    <FormLabel>EndDate</FormLabel>
                    <FormControl>
                        <Input40 
                          placeholder="Do a kickflip"
                          {...field}
                        />
                    </FormControl>
                    <FormMessage />
                    </FormItem>
                )}
                />
              <FormField
              control={form.control}
              name="capacity"
              render={({ field }) => (
                  <FormItem>
                  <FormLabel>Capacity</FormLabel>
                  <FormControl>
                      <Input01 
                        placeholder="Do a kickflip"
                        type={'number'}
                        {...field}
                      />
                  </FormControl>
                  <FormMessage />
                  </FormItem>
              )}
              />
              <CredenzaFooter className="gap-2 pt-2 sm:space-x-0">
                  <CredenzaClose asChild>
                    <Button type="button" variant="outline">
                      Cancel
                    </Button>
                  </CredenzaClose>
                  <Button disabled={isUpdatePending}>
                    {isUpdatePending && (
                      <Icons.spinner
                        className="mr-2 size-4 animate-spin"
                        aria-hidden="true"
                      />
                    )}
                    Save
                  </Button>
            </CredenzaFooter>
          </form>
        </Form>
      );

    case 6:
      return(
        <Form {...form}>
          <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="flex flex-col gap-4"
          >
              <FormField
              control={form.control}
              name="nameClassSession"
              render={({ field }) => (
                  <FormItem>
                  <FormLabel>ClassSession</FormLabel>
                  <FormControl>
                      <Input01 
                        values={selectedClassSession}
                        placeholder="Dddd"
                        {...field}
                      />
                  </FormControl>
                  <FormMessage />
                  </FormItem>
              )}
              />
              <FormField
              control={form.control}
              name="nameClassroom"
              render={({ field }) => (
                  <FormItem>
                  <FormLabel>Classroom</FormLabel>
                  <FormControl>
                      <Input01 
                        placeholder="Do a kickflip"
                        {...field}
                      />
                  </FormControl>
                  <FormMessage />
                  </FormItem>
              )}
              />
              <FormField
              control={form.control}
              name="nameTeacher"
              render={({ field }) => (
                  <FormItem>
                  <FormLabel>Teacher</FormLabel>
                  <FormControl>
                      <Input01 
                        placeholder="Do a kickflip"
                        {...field}
                      />
                  </FormControl>
                  <FormMessage />
                  </FormItem>
              )}
              />
              <FormField
                control={form.control}
                name="startTime"
                render={({ field }) => (
                    <FormItem>
                    <FormLabel>StartTime</FormLabel>
                    <FormControl>
                        <Input40 
                          placeholder="Do a kickflip"
                          {...field}
                        />
                    </FormControl>
                    <FormMessage />
                    </FormItem>
                )}
                />
              <FormField
              control={form.control}
              name="numOfHour"
              render={({ field }) => (
                  <FormItem>
                  <FormLabel>NumOfHour</FormLabel>
                  <FormControl>
                      <Input01 
                        placeholder="Do a kickflip"
                        type={'number'}
                        {...field}
                      />
                  </FormControl>
                  <FormMessage />
                  </FormItem>
              )}
              />  
              <FormField
              control={form.control}
              name="dayOfWeek"
              render={({ field }) => (
                  <FormItem>
                  <FormLabel>DayOfWeek</FormLabel>
                  <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                  >
                      <FormControl>
                      <SelectTrigger className="capitalize">
                          <SelectValue placeholder="Select a Semester" />
                      </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                      <SelectGroup>
                          {DAY_OF_WEEK.map((item) => (
                          <SelectItem
                              key={item}
                              value={item}
                              className="capitalize"
                          >
                              {item}
                          </SelectItem>
                          ))}
                      </SelectGroup>
                      </SelectContent>
                  </Select>
                  <FormMessage />
                  </FormItem>
              )}
              />
              <FormField
              control={form.control}
              name="sessionType"
              render={({ field }) => (
                  <FormItem>
                  <FormLabel>Type</FormLabel>
                  <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                  >
                      <FormControl>
                      <SelectTrigger className="capitalize">
                          <SelectValue placeholder="Select a Type " />
                      </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                      <SelectGroup>
                          {TYPE.map((item) => (
                          <SelectItem
                              key={item}
                              value={item}
                              className="capitalize"
                          >
                              {item}
                          </SelectItem>
                          ))}
                      </SelectGroup>
                      </SelectContent>
                  </Select>
                  <FormMessage />
                  </FormItem>
              )}
              />
              <FormField
              control={form.control}
              name="capacity"
              render={({ field }) => (
                  <FormItem>
                  <FormLabel>Capacity</FormLabel>
                  <FormControl>
                      <Input01 
                        placeholder="Do a kickflip"
                        type={'number'}
                        {...field}
                      />
                  </FormControl>
                  <FormMessage />
                  </FormItem>
              )}
              />
              <CredenzaFooter className="gap-2 pt-2 sm:space-x-0">
                  <CredenzaClose asChild>
                    <Button type="button" variant="outline">
                      Cancel
                    </Button>
                  </CredenzaClose>
                  <Button disabled={isUpdatePending}>
                    {isUpdatePending && (
                      <Icons.spinner
                        className="mr-2 size-4 animate-spin"
                        aria-hidden="true"
                      />
                    )}
                    Save
                  </Button>
            </CredenzaFooter>
          </form>
        </Form>
      );

    case 7:
      return(
        <Form {...form}>
          <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="flex flex-col gap-4"
          >
              <FormField
              control={form.control}
              name="nameClassSession"
              render={({ field }) => (
                  <FormItem>
                  <FormLabel>ClassSession</FormLabel>
                  <FormControl>
                      <Input01 
                        // values={selectedClassSession}
                        placeholder="Dddd"
                        {...field}
                      />
                  </FormControl>
                  <FormMessage />
                  </FormItem>
              )}
              />
              <FormField
              control={form.control}
              name="nameUser"
              render={({ field }) => (
                  <FormItem>
                  <FormLabel>User</FormLabel>
                  <FormControl>
                      <Input01 
                        placeholder="Do a kickflip"
                        {...field}
                      />
                  </FormControl>
                  <FormMessage />
                  </FormItem>
              )}
              />
               
              <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                  <FormItem>
                  <FormLabel>Name</FormLabel>
                  <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                  >
                      <FormControl>
                      <SelectTrigger className="capitalize">
                          <SelectValue placeholder="Select a Name" />
                      </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                      <SelectGroup>
                          {GRADE_TYPE.map((item) => (
                          <SelectItem
                              key={item}
                              value={item}
                              className="capitalize"
                          >
                              {item}
                          </SelectItem>
                          ))}
                      </SelectGroup>
                      </SelectContent>
                  </Select>
                  <FormMessage />
                  </FormItem>
              )}
              />
              
              <FormField
              control={form.control}
              name="value"
              render={({ field }) => (
                  <FormItem>
                  <FormLabel>Value</FormLabel>
                  <FormControl>
                      <Input01 
                        placeholder="Do a kickflip"
                        type={'number'}
                        {...field}
                      />
                  </FormControl>
                  <FormMessage />
                  </FormItem>
              )}
              />
              <CredenzaFooter className="gap-2 pt-2 sm:space-x-0">
                  <CredenzaClose asChild>
                    <Button type="button" variant="outline">
                      Cancel
                    </Button>
                  </CredenzaClose>
                  <Button disabled={isUpdatePending}>
                    {isUpdatePending && (
                      <Icons.spinner
                        className="mr-2 size-4 animate-spin"
                        aria-hidden="true"
                      />
                    )}
                    Save
                  </Button>
            </CredenzaFooter>
          </form>
        </Form>
      );

    case 8:
      return(
        <Form {...form}>
          <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="flex flex-col gap-4"
          >
              <FormField
              control={form.control}
              name="nameUser"
              render={({ field }) => (
                  <FormItem>
                  <FormLabel>User</FormLabel>
                  <FormControl>
                      <Input01 
                        placeholder="Do a kickflip"
                        {...field}
                      />
                  </FormControl>
                  <FormMessage />
                  </FormItem>
              )}
              />
              
              <FormField
              control={form.control}
              name="sessionDetailsId"
              render={({ field }) => (
                  <FormItem>
                  <FormLabel>SessionDetails Id</FormLabel>
                  <FormControl>
                      <Input01 
                        placeholder="Do a kickflip"
                        type={'number'}
                        {...field}
                      />
                  </FormControl>
                  <FormMessage />
                  </FormItem>
              )}
              />
              <CredenzaFooter className="gap-2 pt-2 sm:space-x-0">
                  <CredenzaClose asChild>
                    <Button type="button" variant="outline">
                      Cancel
                    </Button>
                  </CredenzaClose>
                  <Button disabled={isUpdatePending}>
                    {isUpdatePending && (
                      <Icons.spinner
                        className="mr-2 size-4 animate-spin"
                        aria-hidden="true"
                      />
                    )}
                    Save
                  </Button>
            </CredenzaFooter>
          </form>
        </Form>
      );
    
    default:
      break;
  }
}

export function CreactTaskSheet({setLoadingDelete, ...props}) {
  const [isUpdatePending, startUpdateTransition] = useTransition()
  const [isOpen, setIsOpen] = useState(false);
  const selected = useSelector((state) => state.adminContent.selectedContent);
  const selectedClassSession = useSelector((state) => state.adminContent.selectedClassSession);
  const form = useForm({  
  })

  function onSubmit(input) {
    console.log("input",input)
    startUpdateTransition(async () => {
      const {metadata} = await creactTask(input,selected)

      console.log("metadata",metadata)
      if ( typeof metadata == "string") {
        toast.error(metadata)
        return
      }
      setIsOpen(false);
      form.reset()
      props.onOpenChange?.(false);
      toast.success("Creacted!");
    })
  }

  return (
    <Credenza open={isOpen} onOpenChange={setIsOpen}>
        <CredenzaTrigger onClick={() => setIsOpen(true)}>
            Creat
        </CredenzaTrigger>
        <CredenzaContent className="flex flex-col gap-6 sm:max-w-md">
            <CredenzaHeader className="text-left">
            <CredenzaTitle>Creat</CredenzaTitle>
            <CredenzaDescription>
                Creat item and save.
            </CredenzaDescription>
            </CredenzaHeader>

            {/* <TabsDemo form={form} onSubmit={onSubmit} /> */}
            <ScrollArea className="max-h-96 rounded-md overflow-auto ">

              <Form0 form={form} onSubmit={onSubmit} isUpdatePending={isUpdatePending} selected={selected} selectedClassSession={selectedClassSession} />
            </ScrollArea>

            {selected<9 && 
              <Button
              variant="outline"
              size="sm"
              className="gap-2"> 
                Excel 
            </Button>
            }

        </CredenzaContent>
    </Credenza>
  )
}

