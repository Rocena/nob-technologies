import { ImageResponse } from 'next/og'
 
export const runtime = 'edge'
 
export const size = {
  width: 32,
  height: 32,
}
export const contentType = 'image/png'
 
const SHIELD_BASE64 = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAACXBIWXMAAAPoAAAD6AG1e1JrAAAL2UlEQVRYha2XeXSUVZrGq757v6okQIhyDIvsjYLjiLJ0A8qWsGeHEEN2SGXfKlslRZJKJZWdJQkkISQkBjVACGAaEAYBlUYER2zpdgDFBWh1HLDFFtBGO1X1mxMCTM/M8Zz2zLx/ffd8977P+zz3++59H43mH43ubqEBpe8R0M6md+n47y93P3nn/O5VfOF9f5oVq2K9N+//J0DRdCPuD2fC0mF/ufaW65EjuJaXO92rihl/rMPp+9Orx0o5Oe/+vBBCRF8x/zdg6GOt7RvOhVnDbvxwzOXIKVRzOY+U5jgmv7Opd9bbZfZ/Xh/nHFOSzNwTlU6jY8uBHXRP68+h0XbTLfoU+0XYIX2Mrf0y+sOER2+yw+34H+1ibS1upgLHyDP77BMu7GFUThQT0ley+JSZqM8s9pkV4Y6pVWuIeNf0twYq287TPbovR58S3YSIf5S10r8Ij7E/UDHw9Oe3REk7Sm61w+XoUfuQ/7jAqG/fxzU1lUnHd5L275uZErcYw41qilmH8YMs+7ySEMfixkgsH6d/e4wyMxxw68vZV8TPqmG9y7j/5eS/Eurx/vdX1A17UWJLHKLrhF2e+oNTd/4Cg/90kRF/OoNbbCJu5y7hzbs8meBH+KclZN+pptxeRgulTuNrBvvi4uXO2N2RdN5KO/8lZQv7OVqV/12EtZ91zBXGDr/Ifv2LZ1HCC5yifJdd+QynaHoFdXUWOoORgceO4HnjEkNfexGXMAMu4auZ3pnFaraR/lMthY5KQndHsyRnLqvrljgydz5v9yn0ofrtVc4/kLD1CnUe/YXcL8LaD770DJM9jvV+qaS3ICLL7OLwVw7lCijvfYcaYkT5DuSrR9EXWRl87RNGfPQ6Q/c1MmZtFN43X2ZyQTB+B1NJvV7MSIMfFmcmkeueY8ObYRy4FecItS3pNb7oyztEnv7Y+bJ7fxGa/1LC8ziva2M2IdN3/KQ9Dco5J+LdXpQPQRo3IPK3IRKtqN096DZtZVBCAg9VWxjXVsTYZjO/rgrg2dz5RH+ylsdNK5m8M41Zud7UnTdwhBROEu3MbPP5qXCnD1+QbLv/TWj6YsYHLHKtOI3iX+JQjoC256+I9n9DnPoR5ZwD5UM7MtyELN+GuNmLWt2Ia2wygzeWMLI2nykXt+MRuJhpTWuId9YS81EuY31mknnKQAfZBNf5sKJgNrsvBjmftyyk++Pga7Bp5AP2Iw6xVURsRWt5r1fbA9rdPyATm1B+dwft+060X4DSfACZVoE0liJPvINrThYeR7vxLMpgqvMNRqSFMu+cDf+rVfgdT+c5WwAlt01UfpXIBNMq5jSHUdntTd2JAHt22zK+JMV0F7wGBj3U+PUVZWYiIu93TrX8PeT63yOa/ohsO4fsOIvsuYSo6kImliNzqxGnL6I3W3A73MPDtjwm3TnJiGwDs7INTK+NI+CzIqYW+JP2RTZlP+UQsCWQ6VHP8hqxHP0+zBFiWcDhG5Fn6TvonjvLfJesN5G/DkIfYnaKhUno/NJxD8lGDcxABiTjkl6BmtOIzG9CNuxFnLmMzCtBt/cVBsXHMfLyISY0VjAl8Hm861NY+FU1TxevIO7zXEZ4TcO7YAGpOwLZ/FEYXZ8HO1O2+FDxesDfoGKyZtxrZOtjutAviLdrJvgwed4avIIzmR+UzpKwfHSe81BDc1DzWpFZDch1uxHv30AY8lCtGxmcVoTnxkrc0+L4lS2TaW/VMPtqHeNiFrLqwyym5C0lqD2IZUVeTDBHElzvS3HPMrtx53IukRWvGbGTFq3fJnQBa3s1U8MZ7p3GHIONxwKzeSqmBDklFF2EGZnZgjQ2IKv3oO55D3VxGHpjKa6F63m4pIQBSWsYfX4HU+0HmNhTzPCoQOZ0xjC7LZyAXaGsaPLj2dLlxLT70XJlVW94YwDHSKnTDN/mOKjxsqEGFNl13tko8a8gTXvQ1fSgtbYhvGLRh5qQ6c3IrBbUlDr0hRsZtLEJfWgSMjadQW8fYFCRCY96K2MO1/JPn7QxJMyHBReKmVwUwIKOMFbuDiX+YAj+ptkUvrHcHtrkx/ab8fs0A+rvHFbmW5HL1tp1IWb0wWb0q8zoowtxCTOh801An1yONNQjU5uRphfQZdfiEp+Dml+FzC/G9bdduFoLkYYohmwrZsL1HkZZopj4UhZP2NbwtHERcyr9WVwfwNyU2WQfXWEPaQ6i+c/xRzRDGu4c1npZUZbU28XSbFRjKzL9ZdTockTeUUTpSZSNF1CSO5ApLcigbPSZ1ahzg5GFG5FJ+UhLKbuKdEbnFDDSVsAjb7XiWRjLr/YUMNQUx1PlwTyduYq5mf7My/Mi8UiIPah5BfXfJB/WjGhlh2ZBOdplzXaxxIwo+i1K9r+g+uagzXoXJWM/ovgNlKSXEIYm1Dgz+rI69JkWRHrfb1mOsiadh8vqGJdrZWHpBoZWF+BuTmDiJ1sZVRzGzMMZjIsMZI5tOQvr/QjpDrb7tAZTdzv1Jc2YLmxyRSvaGeZeZZEJadqFWGhGb7Sg+mWgj0jFNb8c4V+I6FPGNx594TrUwDhETh0yqwIZlcbgqkZc09cys3QjnjU23IwGhr+xGc+ElTz1QhKjohYxuyOUZfsjmL0hoNe3M5wG8os1Uw4RrI89iPapeKey0IRMbkYG5qCz1aOLz0VdloZqbEEsK0UG2pARG1ANG5BZrciczYjkEmRpHTIpD4/0Ih4urUDGxTN4axnurZU8srWD0aYIxqT4M2N7FN77V/N44iLnioNRdFATpIk5z7CBhZ9+o3kiGjE70SlzO1GmpqOLzUWurEQb+QrasN3IEDO6uGxkmA01czvC0o3M2IxMLkNaN6GWbELG5yLXFqOWlaK//CZum224B61mREkcj6YtZ3JjJGMNC5weM2aw+lLSN2/SPezucTyshZ3KgirEpMV2aepC84wZfawFbew+tEkHkent6Eyl6Cvq0KeUoD5fgSjqQab2FVCBsGxGFm9CLahBl5iLS1YeQ6w2XDPyGVNey4S0FB6K9uWJ1lim7IqzP2b0JRVr54PLaNp+FrkYz6KMm+6UeZ1oJxrQGzcgkzqQtacRiZ3I4Cx0qfmoK62o8dsQpj3I5AZkQiWisAlZ1IA01yBDE3CNSmVMWS2jsy0MMGQy1JKGh2ElY9tTGLspwfncqwlYaPO63wjebQqGNdOjBG9G9cnqFc8Y0FvaUDcdRwnvQBO8A61XOercJERkE2ridkRmFzKpERlXhShsRhZtQeZVo8ZmowsxMMS2HveAMNT4TAZtXot7roEBYSt7R61bQ9Dtqj390Brtg44ooJuJ7ut/vKaZnoby0G/suowmRNSLaKebEMtMyPnxSN9CRFQLamw7ImM3Mq4RuaYSYW5BFrWg5pSjGq3IygZkhAFZakOfWYRraw2u4eF2txUBTLtUfS2VXY/fa0SV/9aWTevEa9C6O3/RzMpD5xVuV7xLHWJOAjpLFQNtNegDshB9Kq3pQKR2IWMbkdFViLxtyIJtqNnlqBnFSFsTIjASXc1G9MYCpy4x2e4SE83EC+03l9/Zt6if/f80Ld397mfJfp4c0swZNeMEmkmhTvHMQrtqWe9wsW3AJTgX4V+LGtOBSOpCrmlERlUictqQ5nbU7ArUlEJE817U0jrUXKtdeAU6XGsrGX/1yAeBnHum33d0/4xH4J73O49u/D4y3Bu/uS5iXkD4JTh1c5bb5fxchwhrR43ajmLYiYhqQIRVIjK2IfNeQM2vQWcsdkrrVrtYGuGUZhvuh/beeez2h1VWrg+8C87Pgd+Pvu24tyVJn+I5+nXKBzVc/bOashNlThLiN6kO1b/OIeL3OUXkFqcMr3GK3JedamarQw1NsYslEcic9QzYd/THR69c7vSBJ+7mhV9gWkF7157d690jb+M59l/JH7zj60/1lkOI5TannJ2BXFqK9DEjl2YiQtY61aI2Bvb8/rsRV7/fugSevJdNe1fyX+oPH6jxd864BdwmXSTskSO9J9X6M7dkdMW3MijnW1F18JbHsa8vjL+OKQKGP1j/d5b+5+I/AQLFNpmoqriHAAAAAElFTkSuQmCC';

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: '#020617',
          borderRadius: 8,
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={SHIELD_BASE64}
          alt="NOBTECH Shield Favicon"
          width="30"
          height="30"
          style={{ objectFit: 'contain' }}
        />
      </div>
    ),
    {
      ...size,
    }
  )
}

