const BASE_URL = "https://es.wikipedia.org/w/api.php";

//Función genérica para la conexión con la api
export async function connect(params = {}, options = {}) {
    try {
        const url = new URL(BASE_URL);

        const finalParams = {
            format: "json",
            origin: "*",
            ...params,
        };

        //Construyo la query
        url.search = new URLSearchParams(finalParams).toString();

        const finalOptions = {
            method: "GET",
            ...options,
        };

        const response = await fetch(url.toString(), finalOptions);

        if (!response.ok) {
            console.log('Petición fallida');
            throw new Error(`Petición fallida (${response.status} ${response.statusText})`);
        }

        const data = await response.json();
        console.log(`Datos obtenidos: ${data}`);
        return data;
    } catch (err) {
        throw new Error(`Error de conexión: ${err.message}`);
    }
}
