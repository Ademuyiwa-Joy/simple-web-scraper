import fetch from 'node-fetch';
import * as cheerio from 'cheerio';
import fs from 'fs';

const url = 'https://www.formula1.com/en/drivers.html'

async function formula1() {
	try{

		const response = await fetch(url);
		const body = await response.text();
		const $ = cheerio.load(body)

		const items = []
		$('.col-12').map((index, element) => {
			const rank = $(element).find('.rank').text()
			const firstName = $(element).find('.listing-item--name > span:first').text()
			const lastName = $(element).find('.listing-item--name > span:last').text()
			const team = $(element).find('.listing-item--team').text()
			const points = $(element).find('.f1-wide--s').text()
			const image = $(element).find('.listing-item--photo > img').attr('data-src')
		
		items.push({
			rank,
			firstName,lastName,
			team,
			points,
			image
		})
		})
		fs.writeFile('formula1.json', JSON.stringify(items), (error) => {
			if(error){
				return console.log(error.message)
			}
			console.log('Document saved.')
		})
		
	}catch(e){
		console.log(e.message)
	}
}

formula1()