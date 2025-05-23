
import { Tool } from '@/types/agents';

interface PhysicsConstant {
  name: string;
  symbol: string;
  value: number;
  unit: string;
  description: string;
}

export class PhysicsConstantsTool implements Tool {
  name = 'physics_constants';
  description = 'Looks up fundamental physics constants and their values';

  private constants: PhysicsConstant[] = [
    {
      name: 'Speed of light in vacuum',
      symbol: 'c',
      value: 299792458,
      unit: 'm/s',
      description: 'The speed of electromagnetic radiation in a vacuum'
    },
    {
      name: 'Gravitational constant',
      symbol: 'G',
      value: 6.67430e-11,
      unit: 'm³/kg⋅s²',
      description: 'The proportionality constant in Newton\'s law of universal gravitation'
    },
    {
      name: 'Planck constant',
      symbol: 'h',
      value: 6.62607015e-34,
      unit: 'J⋅Hz⁻¹',
      description: 'Fundamental constant in quantum mechanics'
    },
    {
      name: 'Elementary charge',
      symbol: 'e',
      value: 1.602176634e-19,
      unit: 'C',
      description: 'The electric charge carried by a single proton'
    },
    {
      name: 'Electron mass',
      symbol: 'mₑ',
      value: 9.1093837015e-31,
      unit: 'kg',
      description: 'The rest mass of an electron'
    },
    {
      name: 'Proton mass',
      symbol: 'mₚ',
      value: 1.67262192369e-27,
      unit: 'kg',
      description: 'The rest mass of a proton'
    }
  ];

  async execute(params: { query: string }): Promise<PhysicsConstant[]> {
    const query = params.query.toLowerCase();
    
    return this.constants.filter(constant => 
      constant.name.toLowerCase().includes(query) ||
      constant.symbol.toLowerCase().includes(query) ||
      constant.description.toLowerCase().includes(query)
    );
  }

  getAllConstants(): PhysicsConstant[] {
    return this.constants;
  }
}
