import './style.css';

<<<<<<< Updated upstream
document.body.insertAdjacentHTML('beforeend', '<h1>Hello World!</h1>');
//test
=======
//document.body.insertAdjacentHTML('beforeend', '<h1>Hello World!</h1>');
const apiKey = import.meta.env['VITE_CONVERTER_API_KEY']
const apiURL = import.meta.env['VITE_CONVERTER_API_URL']

interface CurrencyInfo {
    symbol: string;
    name: string;
    symbol_native: string;
    decimal_digits: number;
    rounding: number;
    code: string;
    name_plural: string;
}

interface CurrencyData {
    [currencyCode: string]: CurrencyInfo;
}

interface ExchangeInfo{
    value:number
}

const currenciesBtn = document.querySelector('#currenciesBtn')
const submit = document.querySelector('input[type=submit]')
const selectCurrenciesIn = document.querySelector("select[name=deviseToConverter]")
const selectCurrenciesOut = document.querySelector("select[name=deviseConverter]")
const amount = document.querySelector("input[name=priceToConverter]")

const getCurrrency = async(): Promise<CurrencyData>=> {
    const response = await fetch(`${apiURL}/currencies?apikey=${apiKey}`)
    const { data } : {data: CurrencyData} = await response.json();
    return data
}

const getExchange = async(base_currency : string, currencies: string): Promise<ExchangeInfo>=>{
    const response = await fetch(`${apiURL}/latest?apikey=${apiKey}&base_currency=${base_currency}&currencies=${currencies}`)
    const {data} : {data: ExchangeInfo} = await response.json();
    return data
}

const setupCurrency = async(e: Event)=>{
    e.preventDefault();
    const listCurrency = await getCurrrency()
    console.log(listCurrency)
    const baseListCurrency = Object.keys(listCurrency).map((currency)=>`<option value="${currency}">${listCurrency[currency]?.name}</option>`).join('');
    const newListCurrency = Object.keys(listCurrency).map((currency)=>`<option value="${currency}">${listCurrency[currency]?.name}</option>`).join('');
    if(selectCurrenciesIn && selectCurrenciesOut){
        selectCurrenciesIn.innerHTML += baseListCurrency
        selectCurrenciesOut.innerHTML += newListCurrency
    }
    
}

const getRatio = async(base_currency : string, currencies: string)=>{
    const ratio = await getExchange(base_currency, currencies)
    return ratio
}

const toConvert = async(e:Event)=>{
    e.preventDefault()
    const base_currency = "EUR"
    const currencies = "USD"
    const ratio = await getRatio(base_currency, currencies)
    console.log(typeof ratio[currencies])
    if(amount){
        console.log(typeof parseFloat(amount.value))
        console.log(parseFloat(amount.value)*ratio[currencies])
    }
}


currenciesBtn?.addEventListener('click', setupCurrency)
submit?.addEventListener('click', toConvert)
>>>>>>> Stashed changes
