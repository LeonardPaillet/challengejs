import './style.css';


//document.body.insertAdjacentHTML('beforeend', '<h1>Hello World!</h1>');
const apiKey = import.meta.env.VITE_CONVERTER_API_KEY
const apiURL = import.meta.env.VITE_CONVERTER_API_URL
const CACHE_EXPIRATION_TIME = 24 * 60 * 60 * 1000; 
const CURRENCY_CACHE_KEY = 'currencyCache';

interface CurrencyInfo {
    symbol: string;
    name: string;
    symbol_native: string;
    decimal_digits: number;
    rounding: number;
    code: string;
    name_plural: string;
}

type CurrencyData = Record<string, CurrencyInfo>;

type ExchangeInfo = Record<string, number>;

interface HistoryInfo{
    price_to_convert : number,
    currency_to_convert : string
    currency_wanted : string,
    price_converted : number,
    date : string

}

interface CachedData {
    data: CurrencyData; // ou le type approprié pour vos données de devise
    timestamp: number;
  }

const submit = document.querySelector<HTMLButtonElement>('input[type=submit]')
const selectCurrenciesIn = document.querySelector<HTMLSelectElement>("select[name=deviseToConverter]")
const selectCurrenciesOut = document.querySelector<HTMLSelectElement>("select[name=deviseConverter]")
const amount = document.querySelector<HTMLButtonElement>("input[name=priceToConverter]")
const resultConvert = document.querySelector<HTMLButtonElement>("input[name=resultConvert][type=number]")
const historyTable : Array<HistoryInfo> = []
const historyHTML = document.querySelector<HTMLElement>('#history')

const getCurrency = async (): Promise<CurrencyData> => {
    const cachedData = localStorage.getItem('currencyDataCache');
    const now = Date.now();

    if (cachedData) {
        const parsedData = JSON.parse(cachedData) as CachedData;
        const { data, timestamp } = parsedData;
        if (now - timestamp < CACHE_EXPIRATION_TIME) {
            return data;
        }
    }

    const response = await fetch(`${apiURL}/currencies?apikey=${apiKey}`);
    const { data }  = await response.json() as { data: CurrencyData };
    
    // Mettre à jour le cache
    localStorage.setItem(CURRENCY_CACHE_KEY, JSON.stringify({ data, timestamp: now }));
    return data;
};

const getExchange = async(base_currency : string, currencies: string): Promise<ExchangeInfo>=>{
    const response = await fetch(`${apiURL}/latest?apikey=${apiKey}&base_currency=${base_currency}&currencies=${currencies}`)
    const {data} = await response.json() as {data: ExchangeInfo};
    return data
}

const setupCurrency = async()=>{
    const listCurrency = await getCurrency()
    console.log(listCurrency)
    const baseListCurrency = Object.keys(listCurrency).map((currency)=>`<option value="${currency}">${listCurrency[currency]?.name}</option>`).join('');
    const newListCurrency = Object.keys(listCurrency).map((currency)=>`<option value="${currency}">${listCurrency[currency]?.name}</option>`).join('');
    if(selectCurrenciesIn && selectCurrenciesOut){
        selectCurrenciesIn.innerHTML += baseListCurrency
        selectCurrenciesOut.innerHTML += newListCurrency
    }
    
}

const getRatio = async(base_currency : string, currencies: string)=>{
    return await getExchange(base_currency, currencies)
}

const writeResult = (result : number) => {
    if(resultConvert){
        resultConvert.value = result.toString()
    }
}

const toConvert = async(event_:Event) =>{
    event_.preventDefault()
    const base_currency = document.querySelector<HTMLSelectElement>("select[name=deviseToConverter]")
    const currencies = document.querySelector<HTMLSelectElement>("select[name=deviseConverter]")
    if(base_currency && currencies){
        const base_currency_value = base_currency.value
        const currency_value = currencies.value
        if(base_currency_value && currency_value){
            const ratio = await getRatio(base_currency_value, currency_value)
            if(amount){
                const conversionRate = ratio[currency_value];
                if(conversionRate){
                    writeResult(Number.parseFloat(amount.value)*conversionRate)
                    addHistory(Number.parseFloat(amount.value), base_currency_value, currency_value, Number.parseFloat(amount.value)*conversionRate)
                }
            }
        }
    }
}

const addHistory = (price_to_convert : number,
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
    for (const history of historyTable) {
        const historyItemDiv = document.createElement('div');
        historyItemDiv.className = 'grid';
        historyItemDiv.innerHTML = `
            <p>${history.price_to_convert}</p>
            <p>${history.currency_to_convert}</p>
            <p>${history.currency_wanted}</p>
            <p>${history.price_converted}</p>
            <p>${history.date}</p>
        `;
        historyHTML.append(historyItemDiv);
    }
    
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

await setupCurrency()
submit?.addEventListener('click', toConvert)
