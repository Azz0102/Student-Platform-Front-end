import { faker } from "@faker-js/faker"
import {
  ArrowDownIcon,
  ArrowRightIcon,
  ArrowUpIcon,
  CheckCircledIcon,
  CircleIcon,
  CrossCircledIcon,
  QuestionMarkCircledIcon,
  StopwatchIcon,
} from "@radix-ui/react-icons"
import { customAlphabet } from "nanoid"

import { generateId } from "@/lib/id"

// Định nghĩa các giá trị hằng số thay thế cho enum
const STATUS_VALUES = ["todo", "in-progress", "done", "canceled"]
const LABEL_VALUES = ["bug", "feature", "enhancement", "documentation"]
const PRIORITY_VALUES = ["low", "medium", "high"]

export function generateRandomTask() {
  return {
    id: generateId("task"),
    code: `TASK-${customAlphabet("0123456789", 4)()}`,
    title: faker.hacker
      .phrase()
      .replace(/^./, (letter) => letter.toUpperCase()),
    status: faker.helpers.shuffle(STATUS_VALUES)[0] ?? "todo",
    label: faker.helpers.shuffle(LABEL_VALUES)[0] ?? "bug",
    priority: faker.helpers.shuffle(PRIORITY_VALUES)[0] ?? "low",
    archived: faker.datatype.boolean({ probability: 0.2 }),
    createdAt: new Date(),
    updatedAt: new Date(),
  }
}

/**
 * Returns the appropriate status icon based on the provided status.
 * @param status - The status of the task.
 * @returns A React component representing the status icon.
 */
export function getStatusIcon(status) {
  const statusIcons = {
    canceled: CrossCircledIcon,
    done: CheckCircledIcon,
    "in-progress": StopwatchIcon,
    todo: QuestionMarkCircledIcon,
  }

  return statusIcons[status] || CircleIcon
}

/**
 * Returns the appropriate priority icon based on the provided priority.
 * @param priority - The priority of the task.
 * @returns A React component representing the priority icon.
 */
export function getPriorityIcon(priority) {
  const priorityIcons = {
    high: ArrowUpIcon,
    low: ArrowDownIcon,
    medium: ArrowRightIcon,
  }

  return priorityIcons[priority] || CircleIcon
}
