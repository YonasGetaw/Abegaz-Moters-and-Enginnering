with open('public/partners/ide.svg', 'r', encoding='utf-8') as f:
    s = f.read()

# Replace fill="#FFFFFF" with fill="#005A70" for tagline, and color the iDE letters orange #F36F21
s = s.replace('<g id="iDE" fill="#FFFFFF">', '<g id="iDE" fill="#005A70">')
s = s.replace('id="Shape" fill-rule="nonzero"></path>\n            <path d="M67.51,46.63', 'id="Shape" fill="#F36F21" fill-rule="nonzero"></path>\n            <path d="M67.51,46.63')
s = s.replace('id="Path"></path>\n            <path d="M0.04,8.21', 'id="Path" fill="#F36F21"></path>\n            <path d="M0.04,8.21')
s = s.replace('id="Path"></path>\n            <path d="M1.14,46.4', 'id="Path" fill="#F36F21"></path>\n            <path d="M1.14,46.4')
s = s.replace('id="Path"></path>\n        </g>', 'id="Path" fill="#F36F21"></path>\n        </g>')

with open('public/partners/ide.svg', 'w', encoding='utf-8') as f:
    f.write(s)
print('Successfully fixed ide.svg colors!')
