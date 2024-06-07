import './style.css';


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

interface HistoryInfo{
    price_to_convert : number,
    currency_to_convert : string
    currency_wanted : string,
    price_converted : number,
    date : string

}

const currenciesBtn = document.querySelector<HTMLButtonElement>('#currenciesBtn')
const submit = document.querySelector<HTMLButtonElement>('input[type=submit]')
const selectCurrenciesIn = document.querySelector<HTMLSelectElement>("select[name=deviseToConverter]")
const selectCurrenciesOut = document.querySelector<HTMLSelectElement>("select[name=deviseConverter]")
const amount = document.querySelector<HTMLButtonElement>("input[name=priceToConverter]")
const resultConvert = document.querySelector<HTMLButtonElement>("input[name=resultConvert][type=number]")
const historyTable : HistoryInfo[] = []
const historyHTML = document.querySelector<HTMLElement>('#history')

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

const writeResult = async(result : number) =>{
    if(resultConvert){
        resultConvert.value = result.toString()
    }
}

const toConvert = async(e:Event)=>{
    e.preventDefault()
    const base_currency = "EUR"
    const currencies = "USD"
    const ratio = await getRatio(base_currency, currencies)
    if(amount){
        writeResult(parseFloat(amount.value)*ratio[currencies])
        addHistory(parseFloat(amount.value), base_currency, currencies, parseFloat(amount.value)*ratio[currencies])

    }
}

const addHistory = async(price_to_convert : number,
                        currency_to_convert : string,
                        currency_wanted : string,
                        price_converted : number,
                        )=>{

    const newHistoryInfo: HistoryInfo = {
        price_to_convert: price_to_convert, // Exemple de valeur
        currency_to_convert: currency_to_convert,
        currency_wanted: currency_wanted,
        price_converted: price_converted,
        date: formatTimestamp(Date.now()) // Date actuelle
    };
    historyTable.push(newHistoryInfo)

    if (!historyHTML) return;
    // Clear existing history
    historyHTML.innerHTML = `
        <div class="grid">
            <p>Prix à convertir</p>
            <p>Devise à convertir</p>
            <p>Devise souhaitée</p>
            <p>Résultat</p>
            <p>Date et heure de conversion</p>
        </div>
    `;
    historyTable.forEach((history) => {
        const historyItemDiv = document.createElement('div');
        historyItemDiv.className = 'grid';
        historyItemDiv.innerHTML = `
            <p>${history.price_to_convert}</p>
            <p>${history.currency_to_convert}</p>
            <p>${history.currency_wanted}</p>
            <p>${history.price_converted}</p>
            <p>${history.date}</p>
        `;
        historyHTML.appendChild(historyItemDiv);
    });
    
}

function formatTimestamp(timestamp: number): string {
    const date = new Date(timestamp);

    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Les mois commencent à 0
    const year = date.getFullYear();

    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');

    return `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`;
}


currenciesBtn?.addEventListener('click', setupCurrency)
submit?.addEventListener('click', toConvert)
