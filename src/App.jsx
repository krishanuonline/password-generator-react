import { useCallback, useEffect, useRef, useState } from "react";

function App() {
	const [length, setLength] = useState(8);
	const [numberAllowed, setNumberAllowed] = useState(false);
	const [symbolAllowed, setSymbolAllowed] = useState(false);
	const [password, setPassword] = useState("");
	const [isCopied, setIsCopied] = useState(false);

	const selectPassword = useRef(null);

	

	const passwordGenerator = useCallback(() => {
		let pass = "";
		let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
		if (numberAllowed) str += "0123456789";
		if (symbolAllowed) str += "!@#$%^&*()_+~`|}{[]:;?><,./-=";

		for (let i = 1; i <= length; i++) {
			let char = Math.floor(Math.random() * str.length + 1);
			pass += str.charAt(char);
		}
		setPassword(pass);

	}, [length, numberAllowed, symbolAllowed]);


	const copyPassword = useCallback(()=>{
		selectPassword.current?.select;
		window.navigator.clipboard.writeText(password);	
		setIsCopied(true);
        setTimeout(() => {
            setIsCopied(false);
        }, 2000);
	},[password]);

	useEffect(() => {
		passwordGenerator();
	}, [passwordGenerator,length,numberAllowed,symbolAllowed]);

	return (
		<div className="w-full max-w-lg mx-auto shadow-2xl rounded-2xl px-4 py-8 my-8 text-orange-500 bg-gray-900 border border-gray-800 relative overflow-hidden">
			<div className={`absolute top-10 left-1/2 -translate-x-1/2 bg-green-500 text-white px-4 py-1 rounded-full shadow-xl transition-all duration-300 transform flex items-center gap-2 z-10 ${isCopied ? "opacity-100 scale-100 translate-y-0" : "opacity-0 scale-90 -translate-y-5 pointer-events-none"}`}>
                <span className="font-bold text-sm">Copied to clipboard!</span>
            </div>

    		<div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-orange-500 via-purple-500 to-blue-500"></div>
			<h1 className="text-white text-3xl font-bold text-center mb-6 tracking-wide"> Password <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-orange-600">Generator</span></h1>
			<div className="flex shadow-lg rounded-xl overflow-hidden mb-6 border border-gray-700 group focus-within:border-orange-500 transition-all duration-300">
				<input type="text" value={password} ref={selectPassword} className="outline-none w-full py-4 px-4 bg-gray-800 text-orange-400 font-mono text-xl tracking-wider placeholder-gray-600 selection:bg-orange-500/30" placeholder="Password" readOnly />
				<button className="outline-none bg-orange-600 hover:bg-orange-700 text-white px-6 py-2 shrink-0 cursor-pointer font-bold text-lg transition-colors duration-200 active:scale-95" onClick={copyPassword} >COPY</button>
			</div>
	    	<div className="flex flex-col gap-y-4 sm:flex-row sm:justify-between sm:items-center text-sm text-gray-300 bg-gray-800/50 p-4 rounded-xl border border-gray-700/50">
				<div className="flex items-center gap-x-3 w-full sm:w-auto">
					<input type="range" min={6} max={100} value={length} className="cursor-pointer w-full h-2 bg-gray-600 rounded-lg appearance-none accent-orange-500 hover:accent-orange-400 transition-all" onChange={(e) => { setLength(e.target.value) }}/>
					<label className="font-semibold w-20 text-right whitespace-nowrap text-orange-400">Len: {length}</label>
				</div>
				<div className="flex justify-between sm:justify-start gap-x-6 w-full sm:w-auto">
					<div className="flex items-center gap-x-2 relative group cursor-pointer">
						<input type="checkbox" defaultChecked={numberAllowed} id="numberInput" className="cursor-pointer w-5 h-5 accent-orange-500 rounded border-gray-600 focus:ring-orange-500 focus:ring-offset-gray-900" onChange={() => { setNumberAllowed((prev) => !prev) }} />
						<label htmlFor="numberInput" className="cursor-pointer font-medium group-hover:text-orange-400 transition-colors">Numbers</label>
					</div>
					<div className="flex items-center gap-x-2 relative group cursor-pointer">
						<input type="checkbox" defaultChecked={symbolAllowed} id="symbolInput" className="cursor-pointer w-5 h-5 accent-orange-500 rounded border-gray-600 focus:ring-orange-500 focus:ring-offset-gray-900" onChange={() => { setSymbolAllowed((prev) => !prev) }}/>
						<label htmlFor="symbolInput" className="cursor-pointer font-medium group-hover:text-orange-400 transition-colors">Symbols</label>
					</div>
				</div>
			</div>
		</div>
	);
}

export default App;
