export type ProductSpec = {
  label: string
  value: string
}

export type Product = {
  slug: string
  category: string
  badge: string
  title: string
  description: string
  image: string
  specs: ProductSpec[]
}

export const products: Record<string, Product> = {
  'oil-immersed-transformer': {
    slug: 'oil-immersed-transformer',
    category: 'Transformers',
    badge: 'TRANSFORMERS',
    title: 'Oil Immersed Transformer',
    description:
      'High-performance oil immersed transformers designed for reliable power distribution across industrial facilities, utilities, and critical energy infrastructure.',
    image: '/images/product-oil-transformer.png',
    specs: [
      { label: 'Power Rating', value: '25 kVA - 40 MVA' },
      { label: 'Voltage Class', value: '11kV - 145kV' },
      { label: 'Frequency', value: '50 / 60 Hz' },
      { label: 'Insulation Level', value: 'Class A / Mineral Oil' },
      { label: 'Cooling Type', value: 'ONAN / ONAF' },
      { label: 'Protection Level', value: 'IP54 Optional' },
      { label: 'Standard', value: 'IEC 60076' },
      { label: 'Installation Type', value: 'Outdoor / Indoor' },
      { label: 'Vector Group', value: 'Dyn11 / Custom' },
      { label: 'Warranty', value: '24 Months' },
    ],
  },
  'dry-type-transformer': {
    slug: 'dry-type-transformer',
    category: 'Transformers',
    badge: 'TRANSFORMERS',
    title: 'Dry Type Transformer',
    description:
      'Low-maintenance dry type transformers for safe indoor applications in commercial buildings, data centers, and industrial power rooms.',
    image: '/images/product-dry-transformer.png',
    specs: [
      { label: 'Power Rating', value: '100 kVA - 10 MVA' },
      { label: 'Voltage Class', value: '1kV - 36kV' },
      { label: 'Frequency', value: '50 / 60 Hz' },
      { label: 'Insulation Level', value: 'Class F / H' },
      { label: 'Cooling Type', value: 'AN / AF' },
      { label: 'Protection Level', value: 'IP21 - IP54' },
      { label: 'Standard', value: 'IEC 60076-11' },
      { label: 'Installation Type', value: 'Indoor' },
      { label: 'Vector Group', value: 'Dyn11' },
      { label: 'Warranty', value: '24 Months' },
    ],
  },
  'compact-substation': {
    slug: 'compact-substation',
    category: 'Substations',
    badge: 'SUBSTATIONS',
    title: 'Compact Substation',
    description:
      'Integrated compact substations combining transformer, MV switchgear, LV distribution, and protection systems in one engineered unit.',
    image: '/images/product-substation.png',
    specs: [
      { label: 'Power Rating', value: '250 kVA - 5 MVA' },
      { label: 'Voltage Class', value: '11kV - 36kV' },
      { label: 'Frequency', value: '50 / 60 Hz' },
      { label: 'Insulation Level', value: 'MV / LV Rated' },
      { label: 'Cooling Type', value: 'Natural Ventilation' },
      { label: 'Protection Level', value: 'IP54 / IP65' },
      { label: 'Standard', value: 'IEC 62271' },
      { label: 'Installation Type', value: 'Outdoor' },
      { label: 'Vector Group', value: 'Custom' },
      { label: 'Warranty', value: '24 Months' },
    ],
  },
  'mv-switchgear': {
    slug: 'mv-switchgear',
    category: 'Switchgear',
    badge: 'SWITCHGEAR',
    title: 'MV Switchgear',
    description:
      'Medium-voltage switchgear systems engineered to protect, control, and optimize industrial and utility distribution networks.',
    image: '/images/product-switchgear.png',
    specs: [
      { label: 'Rated Current', value: '630A - 3150A' },
      { label: 'Voltage Class', value: '12kV - 36kV' },
      { label: 'Frequency', value: '50 / 60 Hz' },
      { label: 'Insulation Level', value: 'AIS / GIS' },
      { label: 'Cooling Type', value: 'Natural Air' },
      { label: 'Protection Level', value: 'IP4X / IP54' },
      { label: 'Standard', value: 'IEC 62271-200' },
      { label: 'Installation Type', value: 'Indoor / Outdoor' },
      { label: 'Operation', value: 'Manual / Motorized' },
      { label: 'Warranty', value: '24 Months' },
    ],
  },
  'power-distribution-panel': {
    slug: 'power-distribution-panel',
    category: 'Power Distribution',
    badge: 'DISTRIBUTION',
    title: 'Power Distribution Panel',
    description:
      'Robust LV distribution panels for safe, efficient, and scalable power delivery in industrial and commercial environments.',
    image: '/images/service-electrical.png',
    specs: [
      { label: 'Rated Current', value: '250A - 6300A' },
      { label: 'Voltage Class', value: 'Up to 1kV' },
      { label: 'Frequency', value: '50 / 60 Hz' },
      { label: 'Insulation Level', value: '1000V Rated' },
      { label: 'Cooling Type', value: 'Natural / Forced' },
      { label: 'Protection Level', value: 'IP31 - IP65' },
      { label: 'Standard', value: 'IEC 61439' },
      { label: 'Installation Type', value: 'Floor Standing' },
      { label: 'Mounting', value: 'Indoor / Outdoor' },
      { label: 'Warranty', value: '18 Months' },
    ],
  },
  'power-capacitor-bank': {
    slug: 'power-capacitor-bank',
    category: 'Power Distribution',
    badge: 'DISTRIBUTION',
    title: 'Power Capacitor Bank',
    description:
      'Automatic and fixed capacitor bank solutions for power factor correction, loss reduction, and energy efficiency improvement.',
    image: '/images/product-capacitor.png',
    specs: [
      { label: 'Power Rating', value: '25 kVAr - 2 MVAr' },
      { label: 'Voltage Class', value: 'Up to 36kV' },
      { label: 'Frequency', value: '50 / 60 Hz' },
      { label: 'Control Type', value: 'Automatic / Fixed' },
      { label: 'Protection Level', value: 'IP31 - IP54' },
      { label: 'Standard', value: 'IEC 60831' },
      { label: 'Installation Type', value: 'Indoor / Outdoor' },
      { label: 'Switching', value: 'Contactor / Thyristor' },
      { label: 'Application', value: 'Power Factor Correction' },
      { label: 'Warranty', value: '18 Months' },
    ],
  },
  'protection-relay': {
    slug: 'protection-relay',
    category: 'Protection Systems',
    badge: 'PROTECTION',
    title: 'Protection Relay',
    description:
      'Digital protection relays for feeders, motors, transformers, and distribution systems with advanced monitoring functions.',
    image: '/images/product-switchgear.png',
    specs: [
      { label: 'Functions', value: 'Feeder / Motor' },
      { label: 'Voltage Class', value: 'LV / MV' },
      { label: 'Frequency', value: '50 / 60 Hz' },
      { label: 'Protocol', value: 'IEC / Modbus' },
      { label: 'Inputs', value: 'Digital / Analog' },
      { label: 'Standard', value: 'IEC 60255' },
      { label: 'Installation Type', value: 'Panel Mounted' },
      { label: 'Display', value: 'LCD / LED' },
      { label: 'Application', value: 'Protection & Control' },
      { label: 'Warranty', value: '18 Months' },
    ],
  },
  'vacuum-circuit-breaker': {
    slug: 'vacuum-circuit-breaker',
    category: 'Switchgear',
    badge: 'SWITCHGEAR',
    title: 'Vacuum Circuit Breaker',
    description:
      'Medium-voltage vacuum circuit breakers designed for reliable switching and protection in demanding distribution networks.',
    image: '/images/service-electrical.png',
    specs: [
      { label: 'Rated Current', value: '630A - 2500A' },
      { label: 'Voltage Class', value: '12kV - 36kV' },
      { label: 'Frequency', value: '50 / 60 Hz' },
      { label: 'Breaking Capacity', value: '25kA - 40kA' },
      { label: 'Operation', value: 'Manual / Motorized' },
      { label: 'Standard', value: 'IEC 62271-100' },
      { label: 'Installation Type', value: 'Indoor' },
      { label: 'Mechanism', value: 'Spring Charged' },
      { label: 'Application', value: 'MV Protection' },
      { label: 'Warranty', value: '24 Months' },
    ],
  },
  'outdoor-isolator': {
    slug: 'outdoor-isolator',
    category: 'Protection Systems',
    badge: 'PROTECTION',
    title: 'Outdoor Isolator',
    description:
      'Outdoor disconnectors and isolators for safe line isolation, switching, and maintenance in overhead distribution systems.',
    image: '/images/product-substation.png',
    specs: [
      { label: 'Rated Current', value: '400A - 1600A' },
      { label: 'Voltage Class', value: '11kV - 145kV' },
      { label: 'Frequency', value: '50 / 60 Hz' },
      { label: 'Insulation Level', value: 'Porcelain / Polymer' },
      { label: 'Operation', value: 'Manual / Motorized' },
      { label: 'Standard', value: 'IEC 62271-102' },
      { label: 'Installation Type', value: 'Outdoor' },
      { label: 'Mounting', value: 'Pole / Structure' },
      { label: 'Application', value: 'Line Isolation' },
      { label: 'Warranty', value: '18 Months' },
    ],
  },
  'surge-arrester': {
    slug: 'surge-arrester',
    category: 'Protection Systems',
    badge: 'PROTECTION',
    title: 'Surge Arrester',
    description:
      'Metal-oxide surge arresters that protect electrical networks and equipment against lightning and switching overvoltages.',
    image: '/images/product-capacitor.png',
    specs: [
      { label: 'Discharge Current', value: '5kA - 20kA' },
      { label: 'Voltage Class', value: '1kV - 145kV' },
      { label: 'Frequency', value: '50 / 60 Hz' },
      { label: 'Material', value: 'Polymer / Porcelain' },
      { label: 'Protection Level', value: 'Distribution / Station' },
      { label: 'Standard', value: 'IEC 60099-4' },
      { label: 'Installation Type', value: 'Indoor / Outdoor' },
      { label: 'Technology', value: 'Metal Oxide' },
      { label: 'Application', value: 'Overvoltage Protection' },
      { label: 'Warranty', value: '18 Months' },
    ],
  },
  'power-cables': {
    slug: 'power-cables',
    category: 'Industrial Accessories',
    badge: 'ACCESSORIES',
    title: 'Power Cables',
    description:
      'Low, medium, and high-voltage power cables for industrial installations, substations, and energy infrastructure projects.',
    image: '/images/service-electrical.png',
    specs: [
      { label: 'Conductor', value: 'Copper / Aluminum' },
      { label: 'Voltage Class', value: 'LV / MV / HV' },
      { label: 'Frequency', value: '50 / 60 Hz' },
      { label: 'Insulation', value: 'XLPE / PVC' },
      { label: 'Sheath', value: 'PVC / PE / LSZH' },
      { label: 'Standard', value: 'IEC 60502' },
      { label: 'Installation Type', value: 'Underground / Tray' },
      { label: 'Armoring', value: 'SWA / AWA Optional' },
      { label: 'Application', value: 'Power Transmission' },
      { label: 'Warranty', value: '12 Months' },
    ],
  },
  'transformer-accessories': {
    slug: 'transformer-accessories',
    category: 'Industrial Accessories',
    badge: 'ACCESSORIES',
    title: 'Transformer Accessories',
    description:
      'Transformer bushings, gauges, protection devices, tap changers, and auxiliary components for maintenance and upgrades.',
    image: '/images/product-oil-transformer.png',
    specs: [
      { label: 'Components', value: 'Bushings / Gauges' },
      { label: 'Voltage Class', value: 'All Classes' },
      { label: 'Frequency', value: '50 / 60 Hz' },
      { label: 'Application', value: 'Oil / Dry Type' },
      { label: 'Material', value: 'OEM Compatible' },
      { label: 'Standard', value: 'IEC / ANSI' },
      { label: 'Installation Type', value: 'Retrofit / New' },
      { label: 'Availability', value: 'On Request' },
      { label: 'Use Case', value: 'Service & Upgrade' },
      { label: 'Warranty', value: '12 Months' },
    ],
  },
}

export const productList = Object.values(products)
