import { ArcElement, Chart as ChartJS, DoughnutController } from 'chart.js'
import React, { useEffect, useState } from 'react'
import { Doughnut } from 'react-chartjs-2'
import { sellsMock } from 'src/Mocks/sells'
import TotalInterestingComponent from 'src/components/SellsCard/Interesting/Interesting'
import RatingComponent from 'src/components/SellsCard/Rating/Rating'
import TotalSellsComponent from 'src/components/SellsCard/TotalSells/TotalSells'

import ProductDetails from '@/components/'
import 'src/scss/sells.scss'
ChartJS.register(DoughnutController, ArcElement)

const SellsCard = () => {
  const [visibleXL, setVisibleXL] = useState(false)
  const [loading, setLoading] = useState(true)

  const handleDeleteSell = () => {
    console.log('Deletar')
  }

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false)
    }, 3000)

    return () => clearTimeout(timer)
  }, [])
  return (
    <div className={`p-4 ${loading ? 'animate-pulse' : ''}`}>
      {loading ? (
        <div className="space-y-3">
          <div className="grid grid-cols-3 gap-4">
            <div className="h-5 bg-gray-500 rounded col-span-2"></div>
            <div className="h-5 bg-gray-500 rounded col-span-2"></div>
            <div className="h-5 bg-gray-500 rounded col-span-2"></div>
            <div className="h-5 bg-gray-500 rounded"></div>
          </div>
        </div>
      ) : (
        <>
          {sellsMock.map((sell, index) => (
            <React.Fragment key={index}>
              <div
                className="d-flex mb-5 gap-4 div-card-sells"
                onClick={() => setVisibleXL(!visibleXL)}
              >
                <img className="rounded" src={sell.image} alt="Imagem do produto" />
                <div className="components-content">
                  <button className="btn btn-primary gender-button">{sell.tag}</button>
                  <div className="d-flex component-row align-items-center">
                    <h5 className="card-title me-5 font-weight-bold">{sell.product}</h5>
                    <RatingComponent rating={sell.rating} />
                    <TotalSellsComponent totalSells={sell.totalSells} />
                    <TotalInterestingComponent totalIntersting={sell.interestings} />
                    <div className="doughnut-container">
                      <Doughnut
                        data={{
                          datasets: [
                            {
                              label: 'My First Dataset',
                              data: [sell.totalSells],
                              backgroundColor: ['#4d44b5'],
                              hoverBackgroundColor: ['#36A2EB'],
                            },
                          ],
                        }}
                        options={{
                          maintainAspectRatio: false,
                          responsive: true,
                          layout: {
                            padding: 0,
                          },
                          plugins: {
                            legend: {
                              display: false,
                            },
                          },
                        }}
                        height={80}
                        width={80}
                      />
                      <div className="chart-percentage">{sell.interestings}</div>
                    </div>
                    <CDropdown className="CDropdow-component" onClick={(e) => e.stopPropagation()}>
                      <CDropdownToggle
                        className="custom-dropdown-toggle bg-white text-black border-0"
                        caret={false}
                      >
                        ...
                      </CDropdownToggle>
                      <CDropdownMenu>
                        <CDropdownItem as="button" onClick={handleDeleteSell}>
                          Excluir
                        </CDropdownItem>
                        <CDropdownItem as="button">Editar</CDropdownItem>
                      </CDropdownMenu>
                    </CDropdown>
                  </div>
                </div>
              </div>
            </React.Fragment>
          ))}
        </>
      )}

      {visibleXL && (
        <>
          <CModal
            size="xl"
            visible={visibleXL}
            onClose={() => setVisibleXL(false)}
            aria-labelledby="OptionalSizesExample1"
          >
            <CModalBody>
              <ProductDetails
                source="https://via.placeholder.com/150"
                title="Nome do produto"
                tag="Feminino"
                paragraph="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec euismod, lorem nec mollis ultricies, felis nunc tincidunt odio, vel ultricies erat leo sit amet dolor. Nullam nec nisl sit amet purus lacinia tincidunt. Sed nec nunc nec turpis ultrices lacinia. Sed nec nunc nec turpis ultrices lacinia."
              />
            </CModalBody>
          </CModal>
        </>
      )}
    </div>
  )
}
export default SellsCard
