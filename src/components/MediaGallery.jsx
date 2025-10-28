import React from 'react'
import { ImageIcon } from 'lucide-react'

export default function MediaGallery() {
  const mediaItems = [
    {
      id: 1,
      title: 'Insurance VA in Action',
      description: 'Nuestros Virtual Assistants manejando tareas administrativas complejas con eficiencia y profesionalismo.',
      placeholder: 'Imagen de VA trabajando en seguros',
      category: 'Operations'
    },
    {
      id: 2,
      title: 'Team Collaboration',
      description: 'Cómo nuestros VAs se integran perfectamente con tu equipo de seguros existente.',
      placeholder: 'Imagen de colaboración en equipo',
      category: 'Team'
    },
    {
      id: 3,
      title: 'Client Success Stories',
      description: 'Agencias que han transformado su negocio con Ocean VA - resultados reales.',
      placeholder: 'Imagen de casos de éxito',
      category: 'Success'
    },
    {
      id: 4,
      title: 'Technology & Tools',
      description: 'Nuestros VAs están capacitados en las principales plataformas AMS del mercado.',
      placeholder: 'Imagen de herramientas y tecnología',
      category: 'Technology'
    }
  ]

  return (
    <section className="section-container bg-white">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4 text-gray-900">
            Conoce Cómo Trabajamos
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Descubre el día a día de nuestros Virtual Assistants y cómo transforman operaciones de agencias de seguros.
          </p>
        </div>

        {/* Media Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {mediaItems.map((item) => (
            <div 
              key={item.id} 
              className="bg-gray-50 rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300 flex flex-col"
            >
              {/* Image Placeholder */}
              <div className="aspect-video bg-gradient-to-br from-ocean-100 to-ocean-50 flex items-center justify-center border-2 border-dashed border-ocean-300">
                <div className="text-center">
                  <ImageIcon className="w-12 h-12 text-ocean-400 mx-auto mb-2" />
                  <p className="text-sm text-ocean-600 font-medium px-2">
                    {item.placeholder}
                  </p>
                </div>
              </div>

              {/* Content */}
              <div className="p-4 flex-1 flex flex-col">
                <div className="mb-2">
                  <span className="inline-block bg-ocean-100 text-ocean-700 text-xs font-bold px-3 py-1 rounded-full">
                    {item.category}
                  </span>
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">
                  {item.title}
                </h3>
                <p className="text-sm text-gray-600 flex-1">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Featured Section - Larger Image */}
        <div className="bg-gradient-to-r from-ocean-50 to-ocean-100 rounded-xl p-8 md:p-12">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            {/* Image Placeholder */}
            <div className="aspect-video bg-gradient-to-br from-ocean-200 to-ocean-100 rounded-lg flex items-center justify-center border-2 border-dashed border-ocean-400">
              <div className="text-center">
                <ImageIcon className="w-16 h-16 text-ocean-500 mx-auto mb-3" />
                <p className="text-lg text-ocean-700 font-medium">
                  Imagen destacada: Transformación de Agencia
                </p>
              </div>
            </div>

            {/* Content */}
            <div>
              <h3 className="text-3xl font-bold text-gray-900 mb-4">
                Resultados Comprobados
              </h3>
              <p className="text-lg text-gray-700 mb-6">
                Agencias que implementaron Ocean VA reportan:
              </p>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <span className="text-ocean-600 font-bold mr-3 text-xl">✓</span>
                  <span className="text-gray-700">Reducción de 70% en costos administrativos</span>
                </li>
                <li className="flex items-start">
                  <span className="text-ocean-600 font-bold mr-3 text-xl">✓</span>
                  <span className="text-gray-700">Aumento en productividad de agentes</span>
                </li>
                <li className="flex items-start">
                  <span className="text-ocean-600 font-bold mr-3 text-xl">✓</span>
                  <span className="text-gray-700">Mejor satisfacción de clientes</span>
                </li>
                <li className="flex items-start">
                  <span className="text-ocean-600 font-bold mr-3 text-xl">✓</span>
                  <span className="text-gray-700">Escalabilidad sin incrementar overhead</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
