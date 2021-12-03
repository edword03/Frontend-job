import fetch from 'node-fetch'

export const getFetch = async(request) => {
  console.log(request);
  const url = new URL(`https://api.hh.ru/vacancies?text=frontend&area=${request ? request.city : '1'}`)

  // url.searchParams.append('area', '')
  console.log(url);
  
  const response = await fetch(url)
  if (response.ok) {
    const data = await response.json()
    return data
  }

  throw new Error(response.status)
}



export const resolvers = {
  Query: {
    getVacancies: () => {
      return getFetch()
    }
  }
}