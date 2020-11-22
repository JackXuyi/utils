type TTask = () => Promise<void>

class TaskQueue {
  static queue: TTask[] = []
  static max: number = 3
  static runningTask: number = 0

  static push = (task: TTask | TTask[]) => {
    if (Array.isArray(task)) {
      TaskQueue.queue.push(...task)
    } else {
      TaskQueue.queue.push(task)
    }

    TaskQueue.runTasks()
  }

  static runTasks = async () => {
    while (TaskQueue.queue.length && TaskQueue.runningTask < TaskQueue.max) {
      TaskQueue.runTask()
    }
  }

  static runTask = async () => {
    try {
      const task = TaskQueue.queue.shift()
      if (task) {
        TaskQueue.runningTask++
        await task()
        TaskQueue.runningTask--
      }
    } catch (e) {
      //
    } finally {
      TaskQueue.runTasks()
    }
  }

  private queue: TTask[] = []
  private max: number
  private runningTask: number = 0

  constructor(max: number) {
    this.max = max
  }

  public push = (task: TTask | TTask[]) => {
    if (Array.isArray(task)) {
      this.queue.push(...task)
    } else {
      this.queue.push(task)
    }

    this.runTasks()
  }

  private runTasks = async () => {
    while (this.queue.length && this.runningTask < this.max) {
      this.runTask()
    }
  }

  private runTask = async () => {
    try {
      const task = this.queue.shift()
      if (task) {
        this.runningTask++
        await task()
        this.runningTask--
      }
    } catch (e) {
      //
    } finally {
      this.runTasks()
    }
  }
}

export default TaskQueue
