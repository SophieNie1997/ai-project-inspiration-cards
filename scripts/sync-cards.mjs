import { readFile, writeFile } from 'node:fs/promises'
import { resolve } from 'node:path'
import { cardsToJson, convertCsvToCards } from './cardCsv.mjs'

const inputPath = resolve('imports/cards.csv')
const outputPath = resolve('public/cards.json')

const csvText = await readFile(inputPath, 'utf8')
const cards = convertCsvToCards(csvText)

if (cards.length === 0) {
  throw new Error(`No classroom cards found in ${inputPath}`)
}

await writeFile(outputPath, cardsToJson(cards), 'utf8')
console.log(`Synced ${cards.length} cards from imports/cards.csv to public/cards.json`)
