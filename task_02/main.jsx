import React, { useState } from 'react'
import { createRoot } from 'react-dom/client'

function getSeasonByMonthNumber(monthNum) {
  if (monthNum === 12 || monthNum < 3) return 'winter'
  if (monthNum < 6) return 'spring'
  if (monthNum < 9) return 'summer'
  return 'autumn'
}

function getClothesAndImageByMonthNumber(monthNumber) {
  const season = getSeasonByMonthNumber(monthNumber)

  switch (season) {
    case 'winter':
      return {
        clothes: 'пальто',
        imgSrc: './images/winter_forest.webp',
        imgAlt: 'Зимовий ліс',
      }
    case 'spring':
      return {
        clothes: 'дощовик',
        imgSrc: './images/spring_forest.webp',
        imgAlt: 'Весняний ліс',
      }
    case 'summer':
      return {
        clothes: 'шорти',
        imgSrc: './images/summer_forest.webp',
        imgAlt: 'Літній ліс',
      }
    default:
      return {
        clothes: 'куртка',
        imgSrc: './images/autumn_forest.webp',
        imgAlt: 'Осінній ліс',
      }
  }
}

// =============================================================================

function InputGroup({ value, onInput, label, type = 'text', className }) {
  const bindingId = crypto.randomUUID()

  return (
    <div className={`input-group ${className}`}>
      <label className="input-group-text" htmlFor={bindingId}>
        {label}
      </label>

      <input
        id={bindingId}
        className="form-control"
        style={{ minWidth: '10ch' }}
        type={type}
        value={value}
        onInput={onInput}
      />
    </div>
  )
}

function App() {
  const [monthNum, setMonthNum] = useState(1)
  const { clothes, imgSrc, imgAlt } = getClothesAndImageByMonthNumber(monthNum)

  function handleMonthChange({ currentTarget: { value } }) {
    const parsedValue = parseInt(value)

    if (!isFinite(parsedValue) || parsedValue < 1 || parsedValue > 12)
      setMonthNum(1)
    else setMonthNum(parsedValue)
  }

  return (
    <div className="container-prose | py-4">
      <h1>Задача №2</h1>
      <p>
        Вводиться номер місяця. Автоматично виводити рекомендований одяг (зима –
        пальто, літо – шорти, ….). Також автоматично виводити зображення з
        відповідним зображенням лісу (зима – ліс зі снігом, осінь – жовтий ліс,
        …).
      </p>
      <hr />
      <h2>Рішення:</h2>
      <InputGroup
        className="mb-3"
        value={monthNum}
        onInput={handleMonthChange}
        label={'Номер місяця:'}
        type="number"
      />
      <p>Рекомендований одяг: {clothes}</p>
      <div className="m-auto" style={{ maxWidth: '45ch' }}>
        <img className="img-fluid rounded" src={imgSrc} alt={imgAlt ?? ''} />
      </div>
    </div>
  )
}

createRoot(document.getElementById('root')).render(<App />)
