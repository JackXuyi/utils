// 阻止事件 (主要是事件冒泡，因为IE不支持事件捕获)
export function stopPropagation(e: Event) {
  const event = e || window.event;
  if (event && event.stopPropagation) {
    event.stopPropagation();
  } else {
    event.cancelBubble = true;
  }
}

// 分别使用dom0||dom2||IE方式 来绑定事件
// 下面的顺序：标准dom2，IE dom2， dom
// 参数： 操作的元素,事件名称 ,事件处理程序
export function addEvent<K extends keyof WindowEventMap>(
  element: EventTarget,
  type: WindowEventMap[K],
  listener: (this: Window, ev: WindowEventMap[K]) => any
) {
  const ele: any = element;
  if (ele.addEventListener) {
    // 事件类型、需要执行的函数、是否捕捉
    ele.addEventListener(type, listener as any, false);
  } else if (ele.attachEvent) {
    ele.attachEvent("on" + type, listener);
  } else {
    ele["on" + type] = listener;
  }
}

// 移除事件
export function removeEvent<K extends keyof WindowEventMap>(
  element: EventTarget,
  type: WindowEventMap[K],
  listener: (this: Window, ev: WindowEventMap[K]) => any
) {
  const ele: any = element;
  if (ele.removeEventListener) {
    ele.removeEventListener(type, listener, false);
  } else if (ele.detachEvent) {
    ele.detachEvent("on" + type, listener);
  } else {
    ele["on" + type] = null;
  }
}

// 取消事件的默认行为
export function preventDefault(event: Event) {
  if (event.preventDefault) {
    event.preventDefault(); // 标准w3c
  } else {
    event.returnValue = false; // IE
  }
}

// 获取事件目标
export function getTarget(event: Event) {
  // 标准W3C 和 IE
  return event.target || event.srcElement;
}

// 获取event对象的引用，取到事件的所有信息，确保随时能使用event；
// export function getEvent(e: Event) {
//   let ev = e || window.event;
//   if (!ev) {
//     let c = (this as any).getEvent.caller;
//     while (c) {
//       ev = c.arguments[0];
//       if (ev && Event === ev.constructor) {
//         break;
//       }
//       c = c.caller;
//     }
//   }
//   return ev;
// }
