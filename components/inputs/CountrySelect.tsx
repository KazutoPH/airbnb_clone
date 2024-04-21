"use client"

import useCountries from '@/app/hooks/useCountries';
import Image from 'next/image';
import Select from 'react-select'
import Flag from 'react-world-flags'

export type CountrySelectValue = {
  flag: string,
  label: string,
  latlng: number[],
  region: string,
  value: string
}

interface CountrySelectProps {
  value?: CountrySelectValue;
  onChange: (value: CountrySelectValue) => void
}

const CountrySelect = ({ value, onChange }: CountrySelectProps) => {

  // custom hook created to fetch all countries
  const { getAll } = useCountries()

  // console.log(getAll())
  return (
    <div>

      {/* a dropdown library */}
      <Select
        className='z-10'
        placeholder="Anywhere"
        isClearable
        options={getAll()}
        value={value}
        onChange={(value) => onChange(value as CountrySelectValue)}
        formatOptionLabel={(option: CountrySelectValue) => (
          <div className='flex flex-row items-center gap-3'>
            <Flag code={option.value} height={17} width={17} />
            <p>
              {option.label},
              <span className='text-neutral-500 ml-1'>
                {option.region}
              </span>
            </p>
          </div>
        )}

        classNames={{
          control: () => 'p-3 border-2',
          input: () => 'text-lg',
          option: () => 'text-lg'
        }}
        theme={(theme) => ({
          ...theme,
          borderRadius: 6,
          colors: {
            ...theme.colors,
            primary: 'black',
            primary25: '#ffe4e6'
          }
        })}
      />
    </div>
  )
}

export default CountrySelect