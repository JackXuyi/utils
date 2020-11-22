const Task = require('./task').default

const mockFetch = (value, timeout, error) => {
  return new Promise((reselove, reject) => {
    const timer = setTimeout(() => {
      clearTimeout(timer)
      if (!error) {
        reselove(value)
      } else {
        reject(value)
      }
    }, timeout)
  })
}

const staticValueList = []
const staticTimerList = [100, 300, 300, 500, 500, 500]

test('单个实例按照顺序执行任务', (done) => {
  const taskObj = new Task(2)
  expect(taskObj.max).toBe(2)
  const timerList = [100, 300, 300, 500, 500, 500]
  const valueList = []
  taskObj.push(
    timerList.map((time, index) => () =>
      mockFetch(`${time}-${index}`, time, !(index % 3))
        .then((val) => valueList.push(val))
        .catch((val) => valueList.push(val))
    )
  )

  const timer = setTimeout(() => {
    clearTimeout(timer)
    expect(valueList).toEqual(
      timerList.map((time, index) => `${time}-${index}`)
    )
    done()
  }, 2000)
})

test('静态类按照顺序执行任务', (done) => {
  expect(Task.max).toBe(3)

  Task.push(
    staticTimerList.map((time, index) => () =>
      mockFetch(`${time}-${index}`, time, !(index % 3))
        .then((val) => staticValueList.push(val))
        .catch((val) => staticValueList.push(val))
    )
  )

  const timer = setTimeout(() => {
    clearTimeout(timer)
    expect(staticValueList).toEqual(
      staticTimerList.map((time, index) => `${time}-${index}`)
    )
    done()
  }, 1000)
})

test('多静态类按照顺序执行共享任务', (done) => {
  expect(Task.max).toBe(3)
  const time = 1000

  Task.push(() =>
    mockFetch(`${time}-${staticTimerList.length}`, time)
      .then((val) => staticValueList.push(val))
      .catch((val) => staticValueList.push(val))
  )

  const timer = setTimeout(() => {
    clearTimeout(timer)
    expect(staticValueList).toEqual(
      [...staticTimerList, time].map((time, index) => `${time}-${index}`)
    )
    done()
  }, 3000)
})
