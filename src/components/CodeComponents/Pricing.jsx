import React from 'react'
import { Check } from 'lucide-react'

/**
 * Pricing Code Component for Webflow
 * 
 * Props:
 * - plans: array - Pricing plans
 * - title: string - Section title
 * - subtitle: string - Section subtitle
 */
export const Pricing = ({ 
  title = 'Simple, Transparent Pricing',
  subtitle = 'Choose the plan that works best for your business',
  plans = [
    {
      name: 'Starter',
      price: '$999',
      period: '/month',
      description: 'Perfect for small teams',
      features: [
        '1 Virtual Assistant',
        '40 hours/week',
        'Email support',
        'Basic reporting'
      ],
      cta: 'Get Started',
      ctaLink: '#contact',
      highlighted: false
    },
    {
      name: 'Professional',
      price: '$1,999',
      period: '/month',
      description: 'For growing businesses',
      features: [
        '2 Virtual Assistants',
        '80 hours/week',
        'Priority support',
        'Advanced reporting',
        'Custom workflows'
      ],
      cta: 'Get Started',
      ctaLink: '#contact',
      highlighted: true
    },
    {
      name: 'Enterprise',
      price: 'Custom',
      period: 'pricing',
      description: 'For large organizations',
      features: [
        '3+ Virtual Assistants',
        '120+ hours/week',
        '24/7 support',
        'Custom reporting',
        'Dedicated account manager',
        'API access'
      ],
      cta: 'Contact Sales',
      ctaLink: '#contact',
      highlighted: false
    }
  ]
}) => {
  return (
    <section className="py-16 sm:py-20 lg:py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12 lg:mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
            {title}
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            {subtitle}
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-3 gap-8 lg:gap-6">
          {plans?.map((plan, idx) => (
            <div
              key={idx}
              className={`relative rounded-lg transition-all duration-300 ${
                plan.highlighted
                  ? 'md:scale-105 bg-white shadow-2xl ring-2 ring-ocean-600'
                  : 'bg-white shadow-lg hover:shadow-xl'
              }`}
            >
              {/* Most Popular Badge */}
              {plan.highlighted && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <span className="bg-ocean-600 text-white px-4 py-1 rounded-full text-sm font-bold">
                    MOST POPULAR
                  </span>
                </div>
              )}

              <div className="p-8">
                {/* Plan Name */}
                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                  {plan.name}
                </h3>
                <p className="text-gray-600 text-sm mb-6">
                  {plan.description}
                </p>

                {/* Price */}
                <div className="mb-6">
                  <span className="text-5xl font-bold text-gray-900">
                    {plan.price}
                  </span>
                  <span className="text-gray-600 ml-2">
                    {plan.period}
                  </span>
                </div>

                {/* CTA Button */}
                <a
                  href={plan.ctaLink}
                  className={`block w-full py-3 px-6 rounded-lg font-bold text-center transition-colors mb-8 ${
                    plan.highlighted
                      ? 'bg-ocean-600 text-white hover:bg-ocean-700'
                      : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
                  }`}
                >
                  {plan.cta}
                </a>

                {/* Features List */}
                <div className="space-y-4">
                  {plan.features?.map((feature, fidx) => (
                    <div key={fidx} className="flex items-start gap-3">
                      <Check 
                        size={20} 
                        className="text-ocean-600 flex-shrink-0 mt-0.5"
                      />
                      <span className="text-gray-700">
                        {feature}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Footer Note */}
        <div className="text-center mt-12">
          <p className="text-gray-600">
            All plans include a 14-day free trial. No credit card required.
          </p>
        </div>
      </div>
    </section>
  )
}

Pricing.displayName = 'Pricing'
Pricing.defaultProps = {
  title: 'Simple, Transparent Pricing',
  subtitle: 'Choose the plan that works best for your business'
}
