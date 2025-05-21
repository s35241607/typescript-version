import openpyxl

# Create a new workbook and select the active sheet
workbook = openpyxl.Workbook()
sheet = workbook.active

# Define the headers
headers = [
    "Order Number",
    "Machine ID",
    "Currency",
    "Contract Start Date",
    "Contract End Date",
    "Status",
    "Remark",
    "Item Type",
    "Item EQP Option ID",
    "Item Saving Base",
    "Item List Price",
    "Item Reference Price"
]

# Write the headers to the first row
for col_num, header in enumerate(headers, 1):
    sheet.cell(row=1, column=col_num, value=header)

# Save the workbook
workbook.save("public/price_table_template.xlsx")

print("Excel file created successfully.")
