export const getCity = async () => {
  const res = await fetch(`${process.env.REACT_APP_API_URL_CITY}`)

  if (res.ok) {
    return await res.json()
  }

  throw new Error()
} 
