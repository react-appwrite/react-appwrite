'use client'

import { useCountries, useLocale } from 'react-appwrite/locale'

export default function LocalePage() {
  // const { data: account } = useAccount()
  const { data: locale } = useLocale()
  const { data: countries } = useCountries()

  return (
    <div>
      <p>
        {locale?.ip}
      </p>

      <ol>
        {
          countries?.map(country => (
            <li
              key={country.code}
            >
              {country.name}
            </li>
          ))
        }
      </ol>
    </div>
  )
}