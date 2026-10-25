// localStorage wrapper that never throws (private mode, blocked storage, etc.).
export const store = {
  get(k) {
    try {
      return localStorage.getItem(k)
    } catch {
      return null
    }
  },
  set(k, v) {
    try {
      localStorage.setItem(k, String(v))
    } catch {
      /* storage unavailable */
    }
  },
}

export const session = {
  get(k) {
    try {
      return sessionStorage.getItem(k)
    } catch {
      return null
    }
  },
  set(k, v) {
    try {
      sessionStorage.setItem(k, String(v))
    } catch {
      /* storage unavailable */
    }
  },
}
