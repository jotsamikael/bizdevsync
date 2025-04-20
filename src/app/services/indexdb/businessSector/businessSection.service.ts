import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BusinessService {
  private sectors = [
    {"businessSector": "Agriculture", "category": "Primary"},
    {"businessSector": "Mining", "category": "Primary"},
    {"businessSector": "Oil & Gas Extraction", "category": "Primary"},
    {"businessSector": "Fishing", "category": "Primary"},
    {"businessSector": "Forestry", "category": "Primary"},
    
    {"businessSector": "Automobile Manufacturing", "category": "Secondary"},
    {"businessSector": "Electronics Manufacturing", "category": "Secondary"},
    {"businessSector": "Textile Production", "category": "Secondary"},
    {"businessSector": "Construction", "category": "Secondary"},
    {"businessSector": "Energy Production", "category": "Secondary"},
    {"businessSector": "Food Processing", "category": "Secondary"},
    {"businessSector": "Chemical Manufacturing", "category": "Secondary"},
    
    {"businessSector": "Retail", "category": "Tertiary"},
    {"businessSector": "Banking", "category": "Tertiary"},
    {"businessSector": "Healthcare", "category": "Tertiary"},
    {"businessSector": "Education", "category": "Tertiary"},
    {"businessSector": "Tourism", "category": "Tertiary"},
    {"businessSector": "Transportation", "category": "Tertiary"},
    {"businessSector": "Real Estate", "category": "Tertiary"},
    {"businessSector": "Entertainment", "category": "Tertiary"},
    
    {"businessSector": "Information Technology", "category": "Quaternary"},
    {"businessSector": "Research & Development", "category": "Quaternary"},
    {"businessSector": "Financial Planning", "category": "Quaternary"},
    {"businessSector": "Consulting", "category": "Quaternary"},
    {"businessSector": "Data Analysis", "category": "Quaternary"},
    
    {"businessSector": "Executive Leadership", "category": "Quinary"},
    {"businessSector": "Government", "category": "Quinary"},
    {"businessSector": "Scientific Research", "category": "Quinary"},
    {"businessSector": "University Education", "category": "Quinary"},
    {"businessSector": "Cultural Institutions", "category": "Quinary"},
    
    {"businessSector": "E-commerce", "category": "Digital"},
    {"businessSector": "Digital Marketing", "category": "Digital"},
    {"businessSector": "Cybersecurity", "category": "Digital"},
    {"businessSector": "Cloud Computing", "category": "Digital"},
    {"businessSector": "AI Development", "category": "Digital"},
    
    {"businessSector": "Renewable Energy", "category": "Green"},
    {"businessSector": "Waste Management", "category": "Green"},
    {"businessSector": "Sustainable Agriculture", "category": "Green"},
    {"businessSector": "Environmental Consulting", "category": "Green"},
    {"businessSector": "Eco-Tourism", "category": "Green"}
  ];

  getSectorsByCategory(category: string) {
    if (!category) return this.sectors;
    return this.sectors.filter(sector => 
      sector.category.toLowerCase() === category.toLowerCase()
    );
  }

  getCategoryBySector(sectorName: string) {
    if (!sectorName) return undefined;
    const foundSector = this.sectors.find(sector => 
      sector.businessSector.toLowerCase() === sectorName.toLowerCase()
    );
    return foundSector ? foundSector.category : undefined;
  }

  getAllCategories(): string[] {
    const categories = new Set(this.sectors.map(sector => sector.category));
    return Array.from(categories);
  }

  getAllBusinessSector(): string[] {
    const businessSector = new Set(this.sectors.map(sector => sector.businessSector));
    return Array.from(businessSector);
  }
}