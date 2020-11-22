interface TEvent {
  timestamp: number
  value?: any
}

type EventCallback = (e: TEvent) => void

interface IEvent {
  addEventListener: (type: string, callback: EventCallback) => void
  removeEventListener: (type: string, callback: EventCallback) => boolean
  removeAllEventListener: (type?: string) => boolean
  dispatchEvent: (type: string, value?: any) => void
}

function buildEventParam(value?: any) {
  return {
    value,
    timestamp: Date.now(),
  }
}

class CustomEvent implements IEvent {
  static eventMap: { [key: string]: EventCallback[] } = {}

  static addEventListener = (type: string, callback: EventCallback) => {
    if (!CustomEvent.eventMap[type]) {
      CustomEvent.eventMap[type] = []
    }
    if (!CustomEvent.hasEventListener(type, callback)) {
      CustomEvent.eventMap[type].push(callback)
    }
  }

  static removeEventListener = (type: string, callback: EventCallback) => {
    const listeners = CustomEvent.eventMap[type] || []
    const index = listeners.findIndex((cb) => cb === callback)
    if (index > -1) {
      listeners.splice(index, 1)
      return true
    }
    return false
  }

  static removeAllEventListener = (type?: string) => {
    if (type !== undefined && CustomEvent.eventMap[type]) {
      delete CustomEvent.eventMap[type]
    } else if (type === undefined) {
      CustomEvent.eventMap = {}
    }
    return true
  }

  static dispatchEvent = (type: string, value?: any) => {
    const listeners = CustomEvent.eventMap[type] || []
    for (const listener of listeners) {
      if (listener && typeof listener === 'function') {
        listener(buildEventParam(value))
      }
    }
  }

  static hasEventListener = (type: string, callback: EventCallback) => {
    const listeners = CustomEvent.eventMap[type] || []
    return listeners.some((listener) => listener === callback)
  }

  private eventMap: { [key: string]: EventCallback[] } = {}

  public addEventListener = (type: string, callback: EventCallback) => {
    if (!this.eventMap[type]) {
      this.eventMap[type] = []
    }
    if (!this.hasEventListener(type, callback)) {
      this.eventMap[type].push(callback)
    }
  }

  public removeEventListener = (type: string, callback: EventCallback) => {
    const listeners = this.eventMap[type] || []
    const index = listeners.findIndex((cb) => cb === callback)
    if (index > -1) {
      listeners.splice(index, 1)
      return true
    }
    return false
  }

  public removeAllEventListener = (type?: string) => {
    if (type !== undefined && this.eventMap[type]) {
      delete this.eventMap[type]
    } else if (type === undefined) {
      this.eventMap = {}
    }
    return true
  }

  public dispatchEvent = (type: string, value?: any) => {
    const listeners = this.eventMap[type] || []
    for (const listener of listeners) {
      if (listener && typeof listener === 'function') {
        listener(buildEventParam(value))
      }
    }
  }

  private hasEventListener = (type: string, callback: EventCallback) => {
    const listeners = this.eventMap[type] || []
    return listeners.some((listener) => listener === callback)
  }
}

export default CustomEvent
