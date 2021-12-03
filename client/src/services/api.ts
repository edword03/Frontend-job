export const getVacancies = async () => {
  const res = await fetch(`${process.env.REACT_APP_API_URL_GET_VACANCIES}?text=Frontend`)
  
  if (!res.ok) {
    throw new Error('Вакансии не найдены')
  }

  return res.json();
} 



export const getCity = async(text: string) => {
  const res = await fetch(`https://api.hh.ru/suggests/area_leaves?text=${text}`)
  const data = await res.json()

  return data;
}
