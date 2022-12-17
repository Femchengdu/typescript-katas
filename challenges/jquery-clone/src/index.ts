import fetch from "node-fetch";

const isElememt = <T>(ele: T | null): ele is T => {
  return ele !== null
}

class SelectorResult {
  #elements: NodeListOf<HTMLElement>
  constructor(elements: NodeListOf<HTMLElement>) {
    this.#elements = elements
  }

  html(value: string): void {
    this.#elements.forEach(element => {
      console.log("lol element ", element)
      element.innerHTML = value
    })

  }

  hide(): void {
    this.#elements.forEach(element => {
      element.style.visibility = 'hidden'
      console.log("lol element ", element)
    })
  }

  show(): void {
    this.#elements.forEach(element => {
      element.style.visibility = 'visible'
      console.log("lol element ", element)
    })
  }

  on<K extends keyof HTMLElementEventMap>(eventName: K, cb: (event: HTMLElementEventMap[K]) => void) {
    this.#elements.forEach(element => {
      element.addEventListener(eventName, cb)
      console.log("lol element ", element)
    })
  }
}

function $(selector: string) {
  return new SelectorResult(document.querySelectorAll(selector));
}

namespace $ {
  export function ajax({
    url, success
  }: {
    url: string,
    success: (data: any) => any
  }): any {
    return fetch(url)
      .then(response => response.json())
  }

}

export default $;
