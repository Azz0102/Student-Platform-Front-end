
import { createParser } from "nuqs/server"
import { z } from "zod"

import { dataTableConfig } from "@/config/data-table"

export const sortingItemSchema = z.object({
  id: z.string(),
  desc: z.boolean(),
})

/**
 * Creates a parser for TanStack Table sorting state.
 * @param originalRow The original row data to validate sorting keys against.
 * @returns A parser for TanStack Table sorting state.
 */
export const getSortingStateParser = (
  originalRow
) => {
  const validKeys = originalRow ? new Set(Object.keys(originalRow)) : null

  return createParser({
    parse: (value) => {
      try {
        const parsed = JSON.parse(value)
        const result = z.array(sortingItemSchema).safeParse(parsed)

        if (!result.success) return null

        if (validKeys && result.data.some((item) => !validKeys.has(item.id))) {
          return null
        }

        return result.data
      } catch {
        return null
      }
    },
    serialize: (value) => JSON.stringify(value),
    eq: (a, b) =>
      a.length === b.length &&
      a.every(
        (item, index) =>
          item.id === b[index]?.id && item.desc === b[index]?.desc
      ),
  })
}

export const filterSchema = z.object({
  id: z.string(),
  value: z.union([z.string(), z.array(z.string())]),
  type: z.enum(dataTableConfig.columnTypes),
  operator: z.enum(dataTableConfig.globalOperators),
  // rowId: z.string(),
})

/**
 * Create a parser for data table filters.
 * @param originalRow The original row data to create the parser for.
 * @returns A parser for data table filters state.
 */
export const getFiltersStateParser = (originalRow) => {
  const validKeys = originalRow ? new Set(Object.keys(originalRow)) : null

  const au = createParser({
    parse: (value) => {
      try {
        let parsed = value; // value có thể là một mảng hoặc đối tượng
        console.log("parsed", parsed);
        // Kiểm tra xem parsed có phải là mảng không, nếu không thì chuyển thành mảng
        if (!Array.isArray(parsed)) {
          parsed = [parsed]; // Chuyển thành mảng chứa một phần tử
        }
        const result = z.array(filterSchema).safeParse(parsed)
        console.log("result", !result.success);
        if (!result.success) return null

        if (validKeys && result.data.some((item) => !validKeys.has(item.id))) {
          return null
        }

        console.log("result", result.data);

        return result.data
      } catch {
        return null
      }
    },
    serialize: (value) => JSON.stringify(value),
    eq: (a, b) =>
      a.length === b.length &&
      a.every(
        (filter, index) =>
          filter.id === b[index]?.id &&
          filter.value === b[index]?.value &&
          filter.type === b[index]?.type &&
          filter.operator === b[index]?.operator
      ),
  })

  console.log("createParser", au);
  return au;
}
