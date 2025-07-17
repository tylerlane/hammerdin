import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import React from "react"
import blessedHammerImg from './assets/blessed_hammer.png';

const blessedHammerBaseDamage = [
	{ min: 12, max: 16 },
	{ min: 20, max: 24 },
	{ min: 28, max: 32 },
	{ min: 36, max: 40 },
	{ min: 44, max: 48 },
	{ min: 52, max: 56 },
	{ min: 60, max: 64 },
	{ min: 68, max: 72 },
	{ min: 78, max: 82 },
	{ min: 88, max: 92 },
	{ min: 98, max: 102 },
	{ min: 108, max: 112 },
	{ min: 118, max: 122 },
	{ min: 128, max: 132 },
	{ min: 138, max: 142 },
	{ min: 148, max: 152 },
	{ min: 160, max: 164 },
	{ min: 172, max: 176 },
	{ min: 184, max: 188 },
	{ min: 196, max: 200 },
	{ min: 208, max: 212 },
	{ min: 220, max: 224 },
	{ min: 232, max: 236 },
	{ min: 244, max: 248 },
	{ min: 256, max: 260 },
	{ min: 268, max: 272 },
	{ min: 280, max: 284 },
	{ min: 292, max: 296 },
	{ min: 304, max: 308 },
	{ min: 316, max: 320 },
	{ min: 328, max: 332 },
	{ min: 340, max: 344 },
	{ min: 352, max: 356 },
	{ min: 364, max: 368 },
	{ min: 376, max: 380 },
	{ min: 388, max: 392 },
	{ min: 400, max: 404 },
	{ min: 412, max: 416 },
	{ min: 424, max: 428 },
	{ min: 436, max: 440 },
	{ min: 450, max: 454 },
	{ min: 464, max: 468 },
	{ min: 478, max: 482 },
	{ min: 492, max: 496 },
	{ min: 506, max: 510 },
	{ min: 520, max: 524 },
	{ min: 534, max: 538 },
	{ min: 548, max: 552 },
	{ min: 562, max: 566 },
	{ min: 576, max: 580 },
]

const concentrationDamageBonus = [
	60, 75, 90, 105, 120, 135, 150, 165, 180, 195, 210, 225, 240, 255, 270, 285,
	300, 315, 330, 345, 360, 375, 390, 405, 420, 435, 450, 465, 480, 495, 510,
	525, 540, 555, 570, 585, 600, 615, 630, 645, 660, 675, 690, 705, 720, 735,
	750, 765, 780, 795,
]

function App() {
	const [blessedHammer, setBlessedHammer] = React.useState(1)
	const [vigor, setVigor] = React.useState(0)
	const [blessedAim, setBlessedAim] = React.useState(0)
	const [concentration, setConcentration] = React.useState(0)
	const [damage, setDamage] = React.useState({ min: 0, max: 0 })
	const [undeadDamage, setUndeadDamage] = React.useState({ min: 0, max: 0 })
	const [calculationDetails, setCalculationDetails] = React.useState({
		baseDamage: { min: 0, max: 0 },
		synergyBonus: 0,
		concentrationBonus: 0
	})

	React.useEffect(() => {
		const blessedHammerLevel = Math.max(1, Math.min(blessedHammer, 50))
		const vigorLevel = Math.max(0, Math.min(vigor, 50))
		const blessedAimLevel = Math.max(0, Math.min(blessedAim, 50))
		const concentrationLevel = Math.max(0, Math.min(concentration, 50))

		const baseDamage = blessedHammerBaseDamage[blessedHammerLevel - 1]
		const synergyBonus =
			vigorLevel * 14 + blessedAimLevel * 14
		const concentrationBonus =
			concentrationLevel > 0
				? concentrationDamageBonus[concentrationLevel - 1] / 2
				: 0

		const minDamage = Math.floor(
			(baseDamage.min * (100 + synergyBonus)) / 100
		)
		const maxDamage = Math.floor(
			(baseDamage.max * (100 + synergyBonus)) / 100
		)

		const finalMinDamage = Math.floor(
			(minDamage * (100 + concentrationBonus)) / 100
		)
		const finalMaxDamage = Math.floor(
			(maxDamage * (100 + concentrationBonus)) / 100
		)

		setDamage({ min: finalMinDamage, max: finalMaxDamage })
		setUndeadDamage({
			min: Math.floor(finalMinDamage * 1.5),
			max: Math.floor(finalMaxDamage * 1.5),
		})

		// Store calculation details for formula display
		setCalculationDetails({
			baseDamage,
			synergyBonus,
			concentrationBonus
		})
	}, [blessedHammer, vigor, blessedAim, concentration])

	return (
		<div className="min-h-screen bg-gray-900 text-white grid place-items-center mx-auto py-8">
			<div className="container mx-auto p-8">
				<h1 className="text-3xl font-bold text-center mb-8">
					Diablo 2: Resurrected - Blessed Hammer Damage Calculator
				</h1>
				<div className="grid grid-cols-1 md:grid-cols-2 gap-8">
					<div className="space-y-4">
						<div>
							<Label htmlFor="blessedHammer">Blessed Hammer Skill Points</Label>
							<Input
								id="blessedHammer"
								type="number"
								value={blessedHammer}
								onChange={(e) => setBlessedHammer(parseInt(e.target.value) || 1)}
								min={1}
								max={50}
								className="w-full bg-gray-800 text-white"
							/>
						</div>
						<div>
							<Label htmlFor="vigor">Vigor Skill Points</Label>
							<Input
								id="vigor"
								type="number"
								value={vigor}
								onChange={(e) => setVigor(parseInt(e.target.value) || 0)}
								min={0}
								max={50}
								className="w-full bg-gray-800 text-white"
							/>
						</div>
						<div>
							<Label htmlFor="blessedAim">Blessed Aim Skill Points</Label>
							<Input
								id="blessedAim"
								type="number"
								value={blessedAim}
								onChange={(e) => setBlessedAim(parseInt(e.target.value) || 0)}
								min={0}
								max={50}
								className="w-full bg-gray-800 text-white"
							/>
						</div>
						<div>
							<Label htmlFor="concentration">
								Concentration Aura Skill Points
							</Label>
							<Input
								id="concentration"
								type="number"
								value={concentration}
								onChange={(e) => setConcentration(parseInt(e.target.value) || 0)}
								min={0}
								max={50}
								className="w-full bg-gray-800 text-white"
							/>
						</div>
					</div>
					<div className="flex flex-col justify-center items-center bg-gray-800 p-8 rounded-lg">
						<img src={blessedHammerImg} alt="Blessed Hammer Icon" className="w-24 h-24 mb-4 rounded shadow-lg border border-gray-700" />
						<h2 className="text-2xl font-bold mb-4">Calculated Damage</h2>
						<div className="text-center">
							<p className="text-lg">
								Damage: {damage.min} - {damage.max}
							</p>
							<p className="text-lg">
								Damage to Undead/Demons: {undeadDamage.min} - {undeadDamage.max}
							</p>
						</div>
					</div>
				</div>

				<div className="mt-8 bg-gray-800 p-6 rounded-lg">
					<h2 className="text-2xl font-bold mb-4 text-center">Damage Formula</h2>
					<div className="space-y-4">
						<div className="bg-gray-700 p-4 rounded-lg">
							<h3 className="text-xl font-semibold mb-2">Step 1: Base Damage</h3>
							<p>Base Damage: {calculationDetails.baseDamage.min} - {calculationDetails.baseDamage.max} (Level {blessedHammer} Blessed Hammer)</p>
						</div>

						<div className="bg-gray-700 p-4 rounded-lg">
							<h3 className="text-xl font-semibold mb-2">Step 2: Apply Synergy Bonus</h3>
							<p>Synergy Bonus: +{calculationDetails.synergyBonus}% ({vigor} Vigor × 14% + {blessedAim} Blessed Aim × 14%)</p>
							<p className="mt-2">Formula: Base Damage × (100% + Synergy Bonus%) / 100</p>
							<p className="mt-1 text-gray-300">
								{calculationDetails.baseDamage.min} × (100% + {calculationDetails.synergyBonus}%) / 100 = {Math.floor((calculationDetails.baseDamage.min * (100 + calculationDetails.synergyBonus)) / 100)} (min)
							</p>
							<p className="text-gray-300">
								{calculationDetails.baseDamage.max} × (100% + {calculationDetails.synergyBonus}%) / 100 = {Math.floor((calculationDetails.baseDamage.max * (100 + calculationDetails.synergyBonus)) / 100)} (max)
							</p>
						</div>

						<div className="bg-gray-700 p-4 rounded-lg">
							<h3 className="text-xl font-semibold mb-2">Step 3: Apply Concentration Bonus</h3>
							<p>Concentration Bonus: +{calculationDetails.concentrationBonus}% (Level {concentration} Concentration)</p>
							<p className="mt-2">Formula: Synergy Damage × (100% + Concentration Bonus%) / 100</p>
							<p className="mt-1 text-gray-300">Final Damage: {damage.min} - {damage.max}</p>
						</div>

						<div className="bg-gray-700 p-4 rounded-lg">
							<h3 className="text-xl font-semibold mb-2">Step 4: Damage to Undead/Demons</h3>
							<p>Formula: Final Damage × 1.5</p>
							<p className="mt-1 text-gray-300">Undead/Demon Damage: {undeadDamage.min} - {undeadDamage.max}</p>
						</div>
					</div>
				</div>

			
			</div>
		</div>
	)
}

export default App
