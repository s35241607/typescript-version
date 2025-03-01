import { faker } from '@faker-js/faker'

export interface MachineResponse {
  id: number
  modelName: string
  process: string
  maker: string
  location: string
  status: string
  serialNumber: string
  installationDate: string
  lastMaintenance: string
  warrantyPeriod: string
  productionCapacity: string
}

export interface EqpOptionResponse {
  id: number
  machineId: number
  partNumber: string
  supplierPartNumber: string
  description: string
  supplement: string
  status: string
  category: string
  compatibility: string
  unitPrice: number
  stockQuantity: number
  leadTime: string
}

export interface PriceTableResponse {
  id: number
  machineId: number
  currency: string
  contractStartDate: Date
  contractEndDate: Date
  orderNumber: string
  createdAt: Date
  createdBy: string
  updatedAt: Date
  updatedBy: string
  ownerId: number
  remark: string
  status: string // 新增 status 欄位
  items: PriceTableItemResponse[] // 新增
}

export interface PriceTableItemResponse {
  id: number
  priceTableId: number
  type: string
  eqpOptionId: number
  savingBase: number
  listPrice: number
  referencePrice: number
}

// 產生假資料
const generateMockMachines = (count: number): MachineResponse[] => {
  return Array.from({ length: count }, (_, i) => ({
    id: i + 1,
    modelName: `Model-${faker.string.alphanumeric(4).toUpperCase()}`,
    process: faker.helpers.arrayElement(['Cutting', 'Welding', 'Assembly', 'Painting', 'Inspection']),
    maker: faker.company.name(),
    location: `Factory ${faker.number.int({ min: 1, max: 5 })}`,
    status: faker.helpers.arrayElement(['Active', 'Inactive', 'Under Maintenance']),
    serialNumber: faker.string.alphanumeric(10).toUpperCase(),
    installationDate: faker.date.past().toISOString().split('T')[0],
    lastMaintenance: faker.date.recent().toISOString().split('T')[0],
    warrantyPeriod: `${faker.number.int({ min: 1, max: 5 })} years`,
    productionCapacity: `${faker.number.int({ min: 100, max: 1000 })} units/day`,
  }))
}

const generateMockEqpOptions = (count: number, machineCount: number): EqpOptionResponse[] => {
  return Array.from({ length: count }, (_, i) => ({
    id: i + 1,
    machineId: faker.number.int({ min: 1, max: machineCount }),
    partNumber: `P-${faker.string.alphanumeric(4).toUpperCase()}`,
    supplierPartNumber: `SP-${faker.string.alphanumeric(4).toUpperCase()}`,
    description: faker.commerce.productName(),
    supplement: faker.lorem.sentence(),
    status: faker.helpers.arrayElement(['Available', 'Backorder', 'Discontinued']),
    category: faker.helpers.arrayElement(['Motor', 'Cooling', 'Control', 'Sensor', 'Frame']),
    compatibility: `Model-${faker.string.alphanumeric(4).toUpperCase()}`,
    unitPrice: faker.number.float({ min: 50, max: 5000 }),
    stockQuantity: faker.number.int({ min: 0, max: 100 }),
    leadTime: `${faker.number.int({ min: 1, max: 8 })} weeks`,
  }))
}

const generateMockPriceTableItems = (priceTableId: number, count: number): PriceTableItemResponse[] => {
  return Array.from({ length: count }, (_, i) => ({
    id: i + 1,
    priceTableId,
    type: faker.helpers.arrayElement(['Standard', 'Discounted', 'Special Offer']),
    eqpOptionId: faker.number.int({ min: 1, max: 1500 }), // 隨機對應 EqOption
    savingBase: faker.number.float({ min: 100, max: 10000 }),
    listPrice: faker.number.float({ min: 100, max: 20000 }),
    referencePrice: faker.number.float({ min: 100, max: 18000 }),
  }))
}

const generateMockPriceTables = (machineCount: number): PriceTableResponse[] => {
  const currencies = ['USD', 'EUR', 'JPY', 'TWD', 'CNY', 'GBP']

  return Array.from({ length: machineCount }, (_, i) => {
    const createdAt = faker.date.past()
    const updatedAt = faker.date.recent()

    return {
      id: i + 1,
      machineId: i + 1,
      currency: faker.helpers.arrayElement(currencies),
      contractStartDate: faker.date.past(),
      contractEndDate: faker.date.future(),
      orderNumber: `PT-${faker.string.alphanumeric(6).toUpperCase()}`,
      createdAt,
      createdBy: faker.person.fullName(),
      updatedAt,
      updatedBy: faker.person.fullName(),
      ownerId: faker.number.int({ min: 1, max: 100 }),
      remark: faker.lorem.sentence(),
      status: faker.helpers.arrayElement(['Draft', 'Pending', 'Approved', 'Rejected']),
      items: generateMockPriceTableItems(i + 1, faker.number.int({ min: 20, max: 100 })), // 每張價格表 1~5 筆 items
    }
  })
}

const mockMachines = generateMockMachines(1000)
const mockEqpOptions = generateMockEqpOptions(1500, 1000)
const mockPriceTables = generateMockPriceTables(1000)

export { mockMachines, mockEqpOptions, mockPriceTables }

const machineService = {
  getMachines: async () => mockMachines,
  getMachineById: async (id: number) => mockMachines.find(machine => machine.id === id),
}

const eqpOptionService = {
  getEqpOptions: async () => mockEqpOptions,
  getEqpOptionById: async (id: number) => mockEqpOptions.find(option => option.id === id),
}

const priceTableService = {
  getPriceTables: async () => mockPriceTables,
  getPriceTableById: async (id: number) => mockPriceTables.find(priceTable => priceTable.id === id),
}

export { machineService, eqpOptionService, priceTableService }
