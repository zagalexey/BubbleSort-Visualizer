import '../src/styles/App.css'
import React from 'react'

function App() {
    const DEFAULT_SIZE = 10
    let delay = 20

    const setDelay = (e) => {
        delay = e.target.value
    }

    const disablePanel = (state) => {
        let controlPanel = document.querySelector('.control-panel')
        for (let i = 0; i < controlPanel.children.length; i++) {
            controlPanel.children[i].disabled = state
        }
    }

    const createArray = (size = DEFAULT_SIZE) => {
        const canvas = document.querySelector('.canvas')
        if (canvas.children.length > 0) {
            let divElements = document.querySelectorAll('.unit')

            for (let i = 0; i < divElements.length; i++) {
                canvas.removeChild(divElements[i])
            }
        }

        for (let i = 1; i <= DEFAULT_SIZE * size; i++) {
            let randomNumber = Math.floor((800 * Math.random()) + 5)
            const el = document.createElement('div')
            el.classList.add('unit')
            el.innerHTML = `${randomNumber}`
            el.style.fontSize = '0px'
            el.style.width = '10px'
            el.style.height = `${randomNumber}px`
            el.style.backgroundColor = 'blue'
            canvas.appendChild(el)
        }
    }

    const bubbleSort = async (delay) => {
        let canvas = document.querySelector('.canvas')
        let elements = document.querySelectorAll('.unit')

        disablePanel(true)

        for (let i = 0; i < elements.length; i++) {
            for (let j = 0; j < elements.length - i - 1; j++) {
                let num1 = parseInt(document.querySelectorAll('.unit')[j].innerHTML)
                let num2 = parseInt(document.querySelectorAll('.unit')[j + 1].innerHTML)

                document.querySelectorAll('.unit')[j].style.backgroundColor = 'red'
                document.querySelectorAll('.unit')[j + 1].style.backgroundColor = 'red'

                if (num1 > num2) {
                    await new Promise(resolve => {
                        setTimeout(() => {
                            canvas.insertBefore(document.querySelectorAll('.unit')[j + 1], document.querySelectorAll('.unit')[j])
                            resolve()
                        }, delay)
                    })
                }
                document.querySelectorAll('.unit')[j].style.backgroundColor = 'blue'
                document.querySelectorAll('.unit')[j + 1].style.backgroundColor = 'blue'
            }
            document.querySelectorAll('.unit')[elements.length - (i + 1)].style.backgroundColor = 'green'
        }
        disablePanel(false)
    }

    return (
        <div className="App">
            <div className="control-panel">
                <button className="create-array"
                        onClick={() => {
                            createArray()
                        }}>Create Array
                </button>
                <label>Resize Arrays</label>
                <input type="range"
                       min={1}
                       max={10}
                       onChange={(e) => {
                           createArray(e.target.value)
                       }}/>
                <label>Input delay</label>
                <input type="number"
                       onChange={(e) => {
                           setDelay(e)
                       }}/>
                <button className="sort-bubble"
                        onClick={() => {
                            bubbleSort(delay)
                        }}>Bubble Sort
                </button>

            </div>
            <div className="canvas">
            </div>
        </div>
    );
}

export default App;
