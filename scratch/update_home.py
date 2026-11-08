import re

file_path = "src/components/home/HomePage.tsx"
with open(file_path, "r", encoding="utf-8") as f:
    content = f.read()

# 1. Replace Hero video background with native HTML5 real-cars-bg.mp4 and remove hero-banner.png
old_bg_pattern = r'\{\/\* Ambient Video Background Layer - Premium Modern Vehicles in Action \(Toyota Cinematic Reel\) \*\/\}[\s\S]*?\{\/\* Short Title as requested by user \*\/\}(\r?\n\s+)<h1'
new_bg = '''{/* Ambient Video Background Layer - Authentic Modern Vehicles in Action */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none select-none z-0 bg-slate-950">
          <video
            ref={(el) => {
              if (el) {
                el.muted = true;
                el.play().catch(() => {});
              }
            }}
            onCanPlay={(e) => {
              e.currentTarget.play().catch(() => {});
            }}
            autoPlay
            loop
            muted
            playsInline
            preload="auto"
            className="w-full h-full object-cover object-center scale-105"
          >
            <source src="/real-cars-bg.mp4" type="video/mp4" />
          </video>
          {/* Subtle contrast gradient: keeps real car footage rich, dynamic & vivid while headline & CTA buttons remain 100% sharp */}
          <div className="absolute inset-0 bg-slate-950/40" />
          <div className="absolute inset-0 bg-gradient-to-b from-slate-950/70 via-transparent to-slate-950/90" />
        </div>

        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full text-center">

          {/* Short Title as requested by user */}
          <h1'''

content, count1 = re.subn(old_bg_pattern, new_bg, content)
print(f"Replaced background: {count1} match(es)")

# 2. Remove "Watch Full Vehicle Showcase in HD" button
old_btn_pattern = r'\{\/\* Quick Cinematic Video Theater Button \*\/\}[\s\S]*?<\/div>(\r?\n\s+)(\{\/\* Floating Quick Booking Widget \*\/\}|<form)'
new_btn = r'\2'
content, count2 = re.subn(old_btn_pattern, new_btn, content)
print(f"Removed button: {count2} match(es)")

# 3. Remove Full-Screen Video Theater Modal at the bottom
old_modal_pattern = r'\{\/\* Full-Screen Vehicle Showcase Video Theater Modal \*\/\}[\s\S]*?\{\/\*\s*Modal Footer with Actions[\s\S]*?\n\s*\<\/div>\r?\n\s*\<\/div>\r?\n\s*\<\/div>\r?\n\s*\)\}\r?\n\s*\<\/div>'
new_modal = '    </div>'
content, count3 = re.subn(old_modal_pattern, new_modal, content)
print(f"Removed modal: {count3} match(es)")

# 4. Remove showHeroVideoModal state
content = content.replace("  // Hero Video Fullscreen Modal State\n  const [showHeroVideoModal, setShowHeroVideoModal] = useState(false);\n", "")
content = content.replace("  // Hero Video Fullscreen Modal State\r\n  const [showHeroVideoModal, setShowHeroVideoModal] = useState(false);\r\n", "")

with open(file_path, "w", encoding="utf-8") as f:
    f.write(content)

print("HomePage.tsx updated successfully!")
