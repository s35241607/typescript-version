// utils.ts

export function formatDate(input: string | Date, format: string = 'yyyy-MM-dd'): string {
  if (!input)
    return ''

  // 確保傳入的是 Date 物件
  const parsedDate = typeof input === 'string' ? new Date(input) : input

  // 檢查是否是有效的日期
  if (Number.isNaN(parsedDate.getTime())) {
    console.warn('Invalid date provided')

    return ''
  }

  const pad = (num: number) => num.toString().padStart(2, '0') // 用來補零

  const formatters: Record<string, (date: Date) => string> = {
    yyyy: date => date.getFullYear().toString(),
    MM: date => pad(date.getMonth() + 1),
    dd: date => pad(date.getDate()),
    HH: date => pad(date.getHours()),
    mm: date => pad(date.getMinutes()),
    ss: date => pad(date.getSeconds()),
    fff: date => pad(date.getMilliseconds()), // 毫秒
    dddd: date => date.toLocaleString('en-US', { weekday: 'long' }), // 星期全名
    ddd: date => date.toLocaleString('en-US', { weekday: 'short' }), // 星期簡寫
  }

  // 先處理格式化字串中較長的格式（例如 yyyy、dddd）
  let formattedDate = format

  // 替換格式字串中的日期部分
  for (const [key, formatter] of Object.entries(formatters)) {
    const regex = new RegExp(key, 'g') // 使用全域 (g) 標誌來處理所有的匹配項

    formattedDate = formattedDate.replace(regex, () => formatter(parsedDate))
  }

  return formattedDate
}
