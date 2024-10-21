import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-50">
      {/* Header Section */}
      <header className="bg-gray-900 text-white py-6">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold text-center">Computer Shope</h1>
          <p className="text-center text-lg mt-2">Your Trusted Partner for Computer Components</p>
        </div>
      </header> 

      <div className="flex items-center justify-center">
        <Button>Go To Dashboard</Button>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-12">
        {/* Our Services Section */}
        <section id="services" className="mb-12">
          <h2 className="text-3xl font-semibold text-gray-800 text-center">Our Services</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
            {/* Service Card 1 */}
            <div className="bg-white shadow-md rounded-lg overflow-hidden">
              <img src="/images/service-pc-build.jpg" alt="Custom PC Builds" className="w-full h-48 object-cover" />
              <div className="p-6">
                <h3 className="text-xl font-semibold text-blue-800">Custom PC Builds</h3>
                <p className="mt-4 text-gray-600">
                  We offer tailor-made PC builds for gamers, professionals, and enthusiasts.
                </p>
              </div>
            </div>
            {/* Service Card 2 */}
            <div className="bg-white shadow-md rounded-lg overflow-hidden">
              <img src="/images/service-hardware-upgrade.jpg" alt="Hardware Upgrades" className="w-full h-48 object-cover" />
              <div className="p-6">
                <h3 className="text-xl font-semibold text-blue-800">Hardware Upgrades</h3>
                <p className="mt-4 text-gray-600">
                  Upgrade your existing system with the latest RAM, SSDs, and graphics cards.
                </p>
              </div>
            </div>
            {/* Service Card 3 */}
            <div className="bg-white shadow-md rounded-lg overflow-hidden">
              <img src="/images/service-repair.jpg" alt="Repair & Maintenance" className="w-full h-48 object-cover" />
              <div className="p-6">
                <h3 className="text-xl font-semibold text-blue-800">Repair & Maintenance</h3>
                <p className="mt-4 text-gray-600">
                  We offer quick repair services for PCs, laptops, and other components.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Our Features Section */}
        <section id="features" className="mb-12">
          <h2 className="text-3xl font-semibold text-gray-800 text-center">Why Choose MS Computer Shopee?</h2>
          <p className="text-center text-gray-600 mt-4">
            Here’s why we are your best choice for computer components and services.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mt-8">
            {/* Feature Card 1 */}
            <div className="bg-white shadow-md rounded-lg overflow-hidden text-center">
              <div className="p-6">
                <h3 className="text-xl font-semibold text-blue-800">Trusted Brands</h3>
                <p className="mt-4 text-gray-600">We partner with top-tier brands to offer the best products.</p>
              </div>
            </div>
            {/* Feature Card 2 */}
            <div className="bg-white shadow-md rounded-lg overflow-hidden text-center">
              <div className="p-6">
                <h3 className="text-xl font-semibold text-blue-800">Affordable Pricing</h3>
                <p className="mt-4 text-gray-600">Get competitive prices without compromising on quality.</p>
              </div>
            </div>
            {/* Feature Card 3 */}
            <div className="bg-white shadow-md rounded-lg overflow-hidden text-center">
              <div className="p-6">
                <h3 className="text-xl font-semibold text-blue-800">Expert Support</h3>
                <p className="mt-4 text-gray-600">Our team of experts is always here to help you choose the right products.</p>
              </div>
            </div>
            {/* Feature Card 4 */}
            <div className="bg-white shadow-md rounded-lg overflow-hidden text-center">
              <div className="p-6">
                <h3 className="text-xl font-semibold text-blue-800">Warranty Assurance</h3>
                <p className="mt-4 text-gray-600">All our products come with official warranties for your peace of mind.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Products Section */}
        <section id="products" className="mb-12">
          <h2 className="text-3xl font-semibold text-gray-800 text-center">Our Products</h2>
          <p className="text-center text-gray-600 mt-4">High-quality products from leading brands to meet all your computing needs.</p>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mt-8">
            {/* Product 1 */}
            <div className="bg-white shadow-md rounded-lg overflow-hidden">
              <img src="/images/product-ram.jpg" alt="RAM" className="w-full h-48 object-cover" />
              <div className="p-6">
                <h3 className="text-xl font-semibold text-blue-800">RAM</h3>
                <p className="mt-4 text-gray-600">Wide range of DDR3, DDR4, and DDR5 RAM options from top brands.</p>
              </div>
            </div>
            {/* Product 2 */}
            <div className="bg-white shadow-md rounded-lg overflow-hidden">
              <img src="/images/product-ssd.jpg" alt="SSD" className="w-full h-48 object-cover" />
              <div className="p-6">
                <h3 className="text-xl font-semibold text-blue-800">Solid State Drives (SSD)</h3>
                <p className="mt-4 text-gray-600">High-speed SSDs with capacities ranging from 256GB to 2TB.</p>
              </div>
            </div>
            {/* Product 3 */}
            <div className="bg-white shadow-md rounded-lg overflow-hidden">
              <img src="/images/product-gpu.jpg" alt="Graphics Cards" className="w-full h-48 object-cover" />
              <div className="p-6">
                <h3 className="text-xl font-semibold text-blue-800">Graphics Cards</h3>
                <p className="mt-4 text-gray-600">Latest NVIDIA and AMD graphics cards for gamers and professionals.</p>
              </div>
            </div>
            {/* Product 4 */}
            <div className="bg-white shadow-md rounded-lg overflow-hidden">
              <img src="/images/product-psu.jpg" alt="Power Supplies" className="w-full h-48 object-cover" />
              <div className="p-6">
                <h3 className="text-xl font-semibold text-blue-800">Power Supplies</h3>
                <p className="mt-4 text-gray-600">Reliable power supplies to ensure smooth and efficient PC performance.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="mb-12">
          <h2 className="text-3xl font-semibold text-gray-800 text-center">Contact Us</h2>
          <p className="text-center text-gray-600 mt-4">Have questions? Reach out to us for assistance or to place an order.</p>
          <div className="flex justify-center mt-8">
            <a href="mailto:info@mscomputershopee.com" className="bg-blue-800 text-white px-8 py-4 rounded-lg hover:bg-blue-700">
              Get In Touch
            </a>
          </div>
        </section>
      </div>

      {/* Footer Section */}
      <footer className="bg-gray-900 text-white py-6">
        <div className="container mx-auto px-4 text-center">
          <p>&copy; {new Date().getFullYear()} MS Computer Shopee. All rights reserved.</p>
        </div>
      </footer>
    </main>
  );
}
