import{j as t}from"./index-Bffgbfsh.js";const l=({className:o=""})=>t.jsxs("div",{className:`relative w-full h-full flex items-center justify-center overflow-hidden ${o}`,children:[t.jsx("style",{children:`
                /* Flowing pulse animations along circuit traces */
                @keyframes flow1 { 0%{stroke-dashoffset:600} 100%{stroke-dashoffset:0} }
                @keyframes flow2 { 0%{stroke-dashoffset:800} 100%{stroke-dashoffset:0} }
                @keyframes flow3 { 0%{stroke-dashoffset:400} 100%{stroke-dashoffset:0} }
                @keyframes flow4 { 0%{stroke-dashoffset:1000} 100%{stroke-dashoffset:0} }
                @keyframes pulse-node { 
                    0%,100%{opacity:1;r:4} 
                    50%{opacity:0.4;r:6} 
                }
                @keyframes glow-chip {
                    0%,100%{filter:drop-shadow(0 0 3px #06B6D4)}
                    50%{filter:drop-shadow(0 0 10px #06B6D4) drop-shadow(0 0 20px #06B6D4)}
                }
                @keyframes scan-line {
                    0%{transform:translateY(-100%)}
                    100%{transform:translateY(100%)}
                }
                @keyframes blink {
                    0%,90%,100%{opacity:1}
                    95%{opacity:0.1}
                }

                .trace-1 {
                    stroke-dasharray: 8 4;
                    stroke-dashoffset: 600;
                    animation: flow1 4s linear infinite;
                }
                .trace-2 {
                    stroke-dasharray: 8 4;
                    stroke-dashoffset: 800;
                    animation: flow2 5s linear infinite;
                }
                .trace-3 {
                    stroke-dasharray: 8 4;
                    stroke-dashoffset: 400;
                    animation: flow3 3.5s linear infinite;
                }
                .trace-4 {
                    stroke-dasharray: 8 4;
                    stroke-dashoffset: 1000;
                    animation: flow4 6s linear infinite;
                }
                .trace-reverse {
                    stroke-dasharray: 8 4;
                    stroke-dashoffset: -600;
                    animation: flow4 4.5s linear infinite reverse;
                }
                .node-pulse {
                    animation: pulse-node 2s ease-in-out infinite;
                }
                .chip-glow {
                    animation: glow-chip 3s ease-in-out infinite;
                }
                .led-blink {
                    animation: blink 3s ease-in-out infinite;
                }
                .led-blink-2 {
                    animation: blink 2.2s ease-in-out infinite 0.8s;
                }
                .led-blink-3 {
                    animation: blink 4s ease-in-out infinite 1.5s;
                }
            `}),t.jsxs("svg",{viewBox:"0 0 520 400",fill:"none",xmlns:"http://www.w3.org/2000/svg",className:"w-full h-full max-w-lg",children:[t.jsx("path",{d:"M 30 60 H 200 V 80 H 490",stroke:"#06B6D4",strokeWidth:"1.5",opacity:"0.25"}),t.jsx("path",{d:"M 30 60 H 200 V 80 H 490",stroke:"#06B6D4",strokeWidth:"1.5",className:"trace-1",opacity:"0.9"}),t.jsx("path",{d:"M 490 140 H 340 V 160 H 140 V 180 H 30",stroke:"#06B6D4",strokeWidth:"1.5",opacity:"0.25"}),t.jsx("path",{d:"M 490 140 H 340 V 160 H 140 V 180 H 30",stroke:"#06B6D4",strokeWidth:"1.5",className:"trace-2",opacity:"0.9"}),t.jsx("path",{d:"M 30 250 H 100 V 270 H 230 V 250 H 490",stroke:"#7C3AED",strokeWidth:"1.5",opacity:"0.25"}),t.jsx("path",{d:"M 30 250 H 100 V 270 H 230 V 250 H 490",stroke:"#7C3AED",strokeWidth:"1.5",className:"trace-3",opacity:"0.9"}),t.jsx("path",{d:"M 30 340 H 180 V 320 H 380 V 340 H 490",stroke:"#10B981",strokeWidth:"1.5",opacity:"0.25"}),t.jsx("path",{d:"M 30 340 H 180 V 320 H 380 V 340 H 490",stroke:"#10B981",strokeWidth:"1.5",className:"trace-4",opacity:"0.9"}),t.jsx("path",{d:"M 80 60 V 340",stroke:"#06B6D4",strokeWidth:"1",opacity:"0.2"}),t.jsx("path",{d:"M 80 60 V 340",stroke:"#06B6D4",strokeWidth:"1",className:"trace-reverse",opacity:"0.7"}),t.jsx("path",{d:"M 260 80 V 250",stroke:"#7C3AED",strokeWidth:"1",opacity:"0.2"}),t.jsx("path",{d:"M 260 80 V 250",stroke:"#7C3AED",strokeWidth:"1",className:"trace-1",opacity:"0.7"}),t.jsx("path",{d:"M 420 140 V 340",stroke:"#F59E0B",strokeWidth:"1",opacity:"0.2"}),t.jsx("path",{d:"M 420 140 V 340",stroke:"#F59E0B",strokeWidth:"1",className:"trace-3",opacity:"0.7"}),t.jsx("path",{d:"M 160 180 V 250",stroke:"#06B6D4",strokeWidth:"1",opacity:"0.2"}),t.jsx("path",{d:"M 160 180 V 250",stroke:"#06B6D4",strokeWidth:"1",className:"trace-2",opacity:"0.6"}),t.jsx("path",{d:"M 340 160 V 250",stroke:"#7C3AED",strokeWidth:"1",opacity:"0.2"}),t.jsx("path",{d:"M 340 160 V 250",stroke:"#7C3AED",strokeWidth:"1",className:"trace-4",opacity:"0.6"}),t.jsxs("g",{className:"chip-glow",children:[t.jsx("rect",{x:"195",y:"105",width:"130",height:"110",rx:"6",fill:"var(--card-bg)",stroke:"#06B6D4",strokeWidth:"1.5"}),[215,240,265,290,305].map((e,i)=>t.jsx("rect",{x:e,y:"98",width:"4",height:"10",rx:"1",fill:"#06B6D4",opacity:"0.8"},`pt${i}`)),[215,240,265,290,305].map((e,i)=>t.jsx("rect",{x:e,y:"212",width:"4",height:"10",rx:"1",fill:"#06B6D4",opacity:"0.8"},`pb${i}`)),[120,140,160,180].map((e,i)=>t.jsx("rect",{x:"188",y:e,width:"10",height:"4",rx:"1",fill:"#06B6D4",opacity:"0.8"},`pl${i}`)),[120,140,160,180].map((e,i)=>t.jsx("rect",{x:"322",y:e,width:"10",height:"4",rx:"1",fill:"#06B6D4",opacity:"0.8"},`pr${i}`)),t.jsx("rect",{x:"205",y:"115",width:"110",height:"90",rx:"3",fill:"#06B6D4",opacity:"0.05"}),t.jsx("text",{x:"260",y:"155",textAnchor:"middle",fill:"#06B6D4",fontSize:"11",fontFamily:"monospace",fontWeight:"bold",children:"AI CORE"}),t.jsx("text",{x:"260",y:"170",textAnchor:"middle",fill:"#06B6D4",fontSize:"7",fontFamily:"monospace",opacity:"0.6",children:"MK-7AX"}),t.jsx("path",{d:"M 220 130 H 250 V 145 H 280",stroke:"#06B6D4",strokeWidth:"0.5",opacity:"0.3"}),t.jsx("path",{d:"M 260 145 V 180",stroke:"#06B6D4",strokeWidth:"0.5",opacity:"0.3"}),t.jsx("path",{d:"M 230 180 H 290",stroke:"#06B6D4",strokeWidth:"0.5",opacity:"0.3"}),t.jsx("circle",{cx:"260",cy:"160",r:"12",stroke:"#06B6D4",strokeWidth:"0.5",opacity:"0.2"}),t.jsx("circle",{cx:"260",cy:"160",r:"4",fill:"#06B6D4",opacity:"0.3"})]}),t.jsxs("g",{children:[t.jsx("rect",{x:"35",y:"40",width:"60",height:"40",rx:"4",fill:"var(--card-bg)",stroke:"#7C3AED",strokeWidth:"1.2"}),t.jsx("text",{x:"65",y:"58",textAnchor:"middle",fill:"#7C3AED",fontSize:"7",fontFamily:"monospace",fontWeight:"bold",children:"INPUT"}),t.jsx("text",{x:"65",y:"70",textAnchor:"middle",fill:"#7C3AED",fontSize:"6",fontFamily:"monospace",opacity:"0.6",children:"CTL-01"}),[45,55,65,75,85].map((e,i)=>t.jsx("rect",{x:e,y:"77",width:"3",height:"7",rx:"0.5",fill:"#7C3AED",opacity:"0.7"},i))]}),t.jsxs("g",{children:[t.jsx("rect",{x:"425",y:"40",width:"60",height:"40",rx:"4",fill:"var(--card-bg)",stroke:"#F59E0B",strokeWidth:"1.2"}),t.jsx("text",{x:"455",y:"58",textAnchor:"middle",fill:"#F59E0B",fontSize:"7",fontFamily:"monospace",fontWeight:"bold",children:"OUTPUT"}),t.jsx("text",{x:"455",y:"70",textAnchor:"middle",fill:"#F59E0B",fontSize:"6",fontFamily:"monospace",opacity:"0.6",children:"CTL-02"}),[435,445,455,465,475].map((e,i)=>t.jsx("rect",{x:e,y:"77",width:"3",height:"7",rx:"0.5",fill:"#F59E0B",opacity:"0.7"},i))]}),t.jsxs("g",{children:[t.jsx("rect",{x:"35",y:"290",width:"80",height:"50",rx:"4",fill:"var(--card-bg)",stroke:"#10B981",strokeWidth:"1.2"}),t.jsx("text",{x:"75",y:"312",textAnchor:"middle",fill:"#10B981",fontSize:"7",fontFamily:"monospace",fontWeight:"bold",children:"DATA BUS"}),t.jsx("text",{x:"75",y:"325",textAnchor:"middle",fill:"#10B981",fontSize:"6",fontFamily:"monospace",opacity:"0.6",children:"MEM-256"}),[45,55,65,75,85,95,105].map((e,i)=>t.jsx("rect",{x:e,y:"337",width:"3",height:"6",rx:"0.5",fill:"#10B981",opacity:"0.7"},i))]}),t.jsxs("g",{children:[t.jsx("rect",{x:"400",y:"290",width:"80",height:"50",rx:"4",fill:"var(--card-bg)",stroke:"#EC4899",strokeWidth:"1.2"}),t.jsx("text",{x:"440",y:"312",textAnchor:"middle",fill:"#EC4899",fontSize:"7",fontFamily:"monospace",fontWeight:"bold",children:"API PORT"}),t.jsx("text",{x:"440",y:"325",textAnchor:"middle",fill:"#EC4899",fontSize:"6",fontFamily:"monospace",opacity:"0.6",children:"I/O-88"}),[410,420,430,440,450,460,470].map((e,i)=>t.jsx("rect",{x:e,y:"337",width:"3",height:"6",rx:"0.5",fill:"#EC4899",opacity:"0.7"},i))]}),t.jsxs("g",{transform:"translate(170, 95)",children:[t.jsx("rect",{x:"-2",y:"-5",width:"22",height:"10",rx:"3",fill:"var(--card-bg)",stroke:"#06B6D4",strokeWidth:"1"}),t.jsx("line",{x1:"-8",y1:"0",x2:"-4",y2:"0",stroke:"#06B6D4",strokeWidth:"1"}),t.jsx("line",{x1:"20",y1:"0",x2:"24",y2:"0",stroke:"#06B6D4",strokeWidth:"1"}),t.jsx("line",{x1:"2",y1:"-4",x2:"2",y2:"4",stroke:"#F59E0B",strokeWidth:"1.5",opacity:"0.7"}),t.jsx("line",{x1:"8",y1:"-4",x2:"8",y2:"4",stroke:"#7C3AED",strokeWidth:"1.5",opacity:"0.7"}),t.jsx("line",{x1:"14",y1:"-4",x2:"14",y2:"4",stroke:"#F59E0B",strokeWidth:"1.5",opacity:"0.7"})]}),t.jsxs("g",{transform:"translate(350, 240)",children:[t.jsx("rect",{x:"-2",y:"-5",width:"22",height:"10",rx:"3",fill:"var(--card-bg)",stroke:"#7C3AED",strokeWidth:"1"}),t.jsx("line",{x1:"-8",y1:"0",x2:"-4",y2:"0",stroke:"#7C3AED",strokeWidth:"1"}),t.jsx("line",{x1:"20",y1:"0",x2:"24",y2:"0",stroke:"#7C3AED",strokeWidth:"1"}),t.jsx("line",{x1:"2",y1:"-4",x2:"2",y2:"4",stroke:"#10B981",strokeWidth:"1.5",opacity:"0.7"}),t.jsx("line",{x1:"8",y1:"-4",x2:"8",y2:"4",stroke:"#06B6D4",strokeWidth:"1.5",opacity:"0.7"}),t.jsx("line",{x1:"14",y1:"-4",x2:"14",y2:"4",stroke:"#10B981",strokeWidth:"1.5",opacity:"0.7"})]}),t.jsxs("g",{transform:"translate(130, 270)",children:[t.jsx("line",{x1:"0",y1:"-6",x2:"0",y2:"6",stroke:"#06B6D4",strokeWidth:"2"}),t.jsx("line",{x1:"6",y1:"-6",x2:"6",y2:"6",stroke:"#06B6D4",strokeWidth:"2"}),t.jsx("line",{x1:"-6",y1:"0",x2:"0",y2:"0",stroke:"#06B6D4",strokeWidth:"1"}),t.jsx("line",{x1:"6",y1:"0",x2:"12",y2:"0",stroke:"#06B6D4",strokeWidth:"1"})]}),t.jsx("circle",{cx:"155",cy:"45",r:"5",fill:"#10B981",opacity:"0.9",className:"led-blink"}),t.jsx("circle",{cx:"155",cy:"45",r:"8",fill:"#10B981",opacity:"0.1",className:"led-blink"}),t.jsx("circle",{cx:"175",cy:"45",r:"5",fill:"#F59E0B",opacity:"0.9",className:"led-blink-2"}),t.jsx("circle",{cx:"195",cy:"45",r:"5",fill:"#EC4899",opacity:"0.9",className:"led-blink-3"}),t.jsx("text",{x:"155",y:"38",textAnchor:"middle",fill:"#10B981",fontSize:"5",fontFamily:"monospace",children:"PWR"}),t.jsx("text",{x:"175",y:"38",textAnchor:"middle",fill:"#F59E0B",fontSize:"5",fontFamily:"monospace",children:"TX"}),t.jsx("text",{x:"195",y:"38",textAnchor:"middle",fill:"#EC4899",fontSize:"5",fontFamily:"monospace",children:"ERR"}),[{cx:80,cy:60,color:"#06B6D4"},{cx:80,cy:180,color:"#06B6D4"},{cx:80,cy:250,color:"#7C3AED"},{cx:80,cy:340,color:"#10B981"},{cx:260,cy:80,color:"#06B6D4"},{cx:260,cy:250,color:"#7C3AED"},{cx:420,cy:140,color:"#F59E0B"},{cx:420,cy:250,color:"#7C3AED"},{cx:420,cy:340,color:"#10B981"},{cx:160,cy:180,color:"#06B6D4"},{cx:160,cy:250,color:"#7C3AED"},{cx:340,cy:160,color:"#7C3AED"},{cx:340,cy:250,color:"#7C3AED"}].map(({cx:e,cy:i,color:s},r)=>t.jsxs("g",{children:[t.jsx("circle",{cx:e,cy:i,r:"4",fill:s,opacity:"0.15",className:"node-pulse"}),t.jsx("circle",{cx:e,cy:i,r:"2.5",fill:s,opacity:"0.9"}),t.jsx("circle",{cx:e,cy:i,r:"6",stroke:s,strokeWidth:"0.5",opacity:"0.3",fill:"none"})]},r)),[[200,80],[320,80],[200,220],[320,220],[140,140],[380,140],[150,320],[370,320]].map(([e,i],s)=>t.jsxs("g",{children:[t.jsx("circle",{cx:e,cy:i,r:"4",fill:"var(--background)",stroke:"#06B6D4",strokeWidth:"1",opacity:"0.5"}),t.jsx("circle",{cx:e,cy:i,r:"1.5",fill:"#06B6D4",opacity:"0.4"})]},s)),t.jsx("defs",{children:t.jsx("pattern",{id:"gridPattern",width:"21",height:"21",patternUnits:"userSpaceOnUse",children:t.jsx("circle",{cx:"20",cy:"20",r:"0.8",fill:"var(--foreground)",opacity:"0.04"})})}),t.jsx("rect",{x:"0",y:"0",width:"520",height:"400",fill:"url(#gridPattern)"}),[[16,16],[16,378],[504,16],[504,378]].map(([e,i],s)=>t.jsx("circle",{cx:e,cy:i,r:"4",fill:"none",stroke:"#06B6D4",strokeWidth:"0.8",opacity:"0.3"},s)),t.jsx("text",{x:"480",y:"390",textAnchor:"end",fill:"var(--foreground)",fontSize:"6",fontFamily:"monospace",opacity:"0.2",children:"MK-PCB-v2.4 © MalikLogix"})]})]});export{l as C};
//# sourceMappingURL=CircuitDiagram-C0Ea-Z4n.js.map
