const CustomeEvent = require('./event').default

const eventType = 'test'

test('单个实例触发事件', () => {
  const eventObj = new CustomeEvent()
  let value = ''
  const handleEvent = (e) => {
    value = value + e.value
  }
  eventObj.addEventListener(eventType, handleEvent)
  eventObj.addEventListener(eventType, handleEvent)
  eventObj.addEventListener(eventType, handleEvent)
  eventObj.dispatchEvent(eventType, eventType)
  expect(value).toBe(eventType)
  eventObj.removeEventListener(eventType, handleEvent)
  eventObj.dispatchEvent(eventType, 'type')
  expect(value).toBe(eventType)

  eventObj.addEventListener('test', handleEvent)
  eventObj.removeAllEventListener('test')
  eventObj.dispatchEvent('test', 'type')
  expect(value).toBe(eventType)

  eventObj.addEventListener('test1', handleEvent)
  eventObj.removeAllEventListener()
  eventObj.dispatchEvent('test1', 'type')
  expect(value).toBe(eventType)
})

test('静态类触发事件', async () => {
  let value = ''
  const handleEvent = (e) => {
    value = value + e.value
  }
  CustomeEvent.addEventListener(eventType, handleEvent)
  CustomeEvent.addEventListener(eventType, handleEvent)
  CustomeEvent.addEventListener(eventType, handleEvent)
  CustomeEvent.dispatchEvent(eventType, eventType)
  expect(value).toBe(eventType)
  CustomeEvent.removeEventListener(eventType, handleEvent)
  CustomeEvent.dispatchEvent(eventType, 'type')
  expect(value).toBe(eventType)

  CustomeEvent.addEventListener('test', handleEvent)
  CustomeEvent.removeAllEventListener('test')
  CustomeEvent.dispatchEvent('test', 'type')
  expect(value).toBe(eventType)

  CustomeEvent.addEventListener('test1', handleEvent)
  CustomeEvent.removeAllEventListener()
  CustomeEvent.dispatchEvent('test1', 'type')
  expect(value).toBe(eventType)
})
