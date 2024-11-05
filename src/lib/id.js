import { customAlphabet } from "nanoid"

const prefixes = {
  task: "tsk",
}


/**
 * Generates a unique ID with optional prefix and configuration.
 * @param prefixOrOptions The prefix string or options object
 * @param options The options for generating the ID
 */
export function generateId(
  prefixOrOptions,
  options = {}
) {
  if (typeof prefixOrOptions === "object") {
    options = prefixOrOptions
    prefixOrOptions = undefined
  }

  const { length = 12, separator = "_" } = options
  const id = customAlphabet(
    "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz",
    length
  )()

  return prefixOrOptions
    ? `${prefixes[prefixOrOptions]}${separator}${id}`
    : id
}
