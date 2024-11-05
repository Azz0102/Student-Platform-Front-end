/**
 * @see https://github.com/ethanniser/NextMaster/blob/main/src/lib/unstable-cache.ts
 */

import { cache } from "react"
import { unstable_cache as next_unstable_cache } from "next/cache"

// next_unstable_cache doesn't handle deduplication, so we wrap it in React's cache
export const unstable_cache = (
  cb,
  keyParts,
  options
) => cache(next_unstable_cache(cb, keyParts, options))
