# Locale Hooks

➡️ [Appwrite Documentation](https://appwrite.io/docs/client/locale)

## useLocale

```tsx
import { useLocale } from 'react-appwrite/locale'

function CountryLabel() {
  const { data: locale } = useLocale()

  return <span>You are from {locale ? locale.country : 'nowhere!'}</span>
}
```

---

## useCountries

```tsx
import { useCountries } from 'react-appwrite/locale'

function CountriesList() {
  const { data: countries } = useCountries()

  return (
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
  )
}
```

---

## useContinents

```tsx
import { useContinents } from 'react-appwrite/locale'

function ContinentsList() {
  const { data: continents } = useContinents()

  return (
    <ol>
      {
        continents?.map(continent => (
          <li
            key={continent.code}
          >
            {continent.name}
          </li>
        ))
      }
    </ol>
  )
}
```

---

## useCurrencies

```tsx
import { useCurrencies } from 'react-appwrite/locale'

function CurrenciesList() {
  const { data: currencies } = useCurrencies()

  return (
    <ol>
      {
        currencies?.map(currency => (
          <li
            key={currency.code}
          >
            {currency.name}
          </li>
        ))
      }
    </ol>
  )
}
```

---

## useLanguages

```tsx
import { useLanguages } from 'react-appwrite/locale'

function LanguagesList() {
  const { data: languages } = useLanguages()

  return (
    <ol>
      {
        languages?.map(language => (
          <li
            key={language.code}
          >
            {language.name}
          </li>
        ))
      }
    </ol>
  )
}
```

---

## useContinents

```tsx
import { useCountriesPhoneCodes } from 'react-appwrite/locale'

function CountriesPhoneCodesList() {
  const { data: countriesPhoneCodes } = useCountriesPhoneCodes()

  return (
    <ol>
      {
        countriesPhoneCodes?.map(countryPhoneCode => (
          <li
            key={countryPhoneCode.code}
          >
            {countryPhoneCode.code} - {countryPhoneCode.countryName}
          </li>
        ))
      }
    </ol>
  )
}
```