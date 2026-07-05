import { describe, it, expect } from 'vitest'
import {
  allRegions,
  timeline,
  additionalTimelineEvents,
  mapRegions,
  quizQuestions,
  comparisonRows,
  glossary,
  sources,
  persons,
  wonders,
  architecturalOrders,
  epochs,
  authorAnalysis,
  FAQ_DATA,
} from '../history-data'

describe('history-data', () => {
  describe('regions', () => {
    it('each region has required fields', () => {
      for (const region of allRegions) {
        expect(region.id).toBeTruthy()
        expect(region.name).toBeTruthy()
        expect(region.tagline).toBeTruthy()
        expect(region.icon).toBeTruthy()
        expect(region.color).toMatch(/^oklch\(/)
        expect(region.cities.length).toBeGreaterThan(0)
        expect(region.description.length).toBeGreaterThan(0)
      }
    })

    it('allRegions contains all four regions', () => {
      expect(allRegions).toHaveLength(4)
      expect(allRegions.map((r) => r.id)).toEqual([
        'greece',
        'rome',
        'mesopotamia',
        'kuban',
      ])
    })

    it('each city has required fields', () => {
      for (const region of allRegions) {
        for (const city of region.cities) {
          expect(city.id).toBeTruthy()
          expect(city.name).toBeTruthy()
          expect(city.region).toBeTruthy()
          expect(city.era).toBeTruthy()
          expect(city.summary).toBeTruthy()
          expect(city.description.length).toBeGreaterThan(0)
          expect(Array.isArray(city.landmarks)).toBe(true)
        }
      }
    })

    it('each landmark has required fields', () => {
      for (const region of allRegions) {
        for (const city of region.cities) {
          for (const lm of city.landmarks) {
            expect(lm.id).toBeTruthy()
            expect(lm.name).toBeTruthy()
            expect(lm.period).toBeTruthy()
            expect(lm.shortDesc).toBeTruthy()
            expect(lm.fullDesc).toBeTruthy()
            expect(lm.highlights.length).toBeGreaterThan(0)
          }
        }
      }
    })
  })

  describe('timeline', () => {
    it('has events', () => {
      expect(timeline.length).toBeGreaterThan(0)
    })

    it('each event has yearLabel and at least one region event', () => {
      for (const event of timeline) {
        expect(event.yearLabel).toBeTruthy()
        expect(
          event.greece || event.rome || event.mesopotamia || event.kuban
        ).toBeTruthy()
      }
    })

    it('additionalTimelineEvents are sorted by year', () => {
      for (let i = 1; i < additionalTimelineEvents.length; i++) {
        expect(additionalTimelineEvents[i].year).toBeGreaterThanOrEqual(
          additionalTimelineEvents[i - 1].year
        )
      }
    })
  })

  describe('mapRegions', () => {
    it('has regions', () => {
      expect(mapRegions.length).toBeGreaterThan(0)
    })

    it('each region has position and metadata', () => {
      for (const r of mapRegions) {
        expect(r.id).toBeTruthy()
        expect(r.name).toBeTruthy()
        expect(r.x).toBeGreaterThanOrEqual(0)
        expect(r.x).toBeLessThanOrEqual(100)
        expect(r.y).toBeGreaterThanOrEqual(0)
        expect(r.y).toBeLessThanOrEqual(100)
        expect(r.region).toBeTruthy()
        expect(r.description).toBeTruthy()
      }
    })
  })

  describe('quizQuestions', () => {
    it('has questions', () => {
      expect(quizQuestions.length).toBeGreaterThan(0)
    })

    it('each question has 4 options and a valid correct index', () => {
      for (const q of quizQuestions) {
        expect(q.options).toHaveLength(4)
        expect(q.correct).toBeGreaterThanOrEqual(0)
        expect(q.correct).toBeLessThan(4)
      }
    })

    it('each question has required text fields', () => {
      for (const q of quizQuestions) {
        expect(q.question).toBeTruthy()
        expect(q.explanation).toBeTruthy()
        expect(q.region).toBeTruthy()
      }
    })
  })

  describe('comparisonRows', () => {
    it('has rows', () => {
      expect(comparisonRows.length).toBeGreaterThan(0)
    })

    it('each row has all four region values', () => {
      for (const row of comparisonRows) {
        expect(row.criterion).toBeTruthy()
        expect(row.greece).toBeTruthy()
        expect(row.rome).toBeTruthy()
        expect(row.mesopotamia).toBeTruthy()
        expect(row.kuban).toBeTruthy()
      }
    })
  })

  describe('glossary', () => {
    it('has terms', () => {
      expect(glossary.length).toBeGreaterThan(0)
    })

    it('each term has required fields', () => {
      for (const term of glossary) {
        expect(term.term).toBeTruthy()
        expect(term.definition).toBeTruthy()
        expect(term.origin).toBeTruthy()
      }
    })
  })

  describe('sources', () => {
    it('has sources', () => {
      expect(sources.length).toBeGreaterThan(0)
    })

    it('each source has required fields', () => {
      for (const src of sources) {
        expect(src.title).toBeTruthy()
        expect(src.description).toBeTruthy()
        expect(src.category).toBeTruthy()
      }
    })
  })

  describe('persons', () => {
    it('has persons', () => {
      expect(persons.length).toBeGreaterThan(0)
    })

    it('each person has required fields', () => {
      for (const p of persons) {
        expect(p.id).toBeTruthy()
        expect(p.name).toBeTruthy()
        expect(p.region).toBeTruthy()
        expect(p.era).toBeTruthy()
        expect(p.role).toBeTruthy()
        expect(p.shortBio).toBeTruthy()
        expect(p.fullBio).toBeTruthy()
        expect(p.achievements.length).toBeGreaterThan(0)
      }
    })
  })

  describe('wonders', () => {
    it('has 7 wonders', () => {
      expect(wonders).toHaveLength(7)
    })

    it('each wonder has required fields', () => {
      for (const w of wonders) {
        expect(w.id).toBeTruthy()
        expect(w.name).toBeTruthy()
        expect(w.location).toBeTruthy()
        expect(w.built).toBeTruthy()
        expect(w.builder).toBeTruthy()
        expect(w.destroyed).toBeTruthy()
        expect(w.shortDesc).toBeTruthy()
        expect(w.fullDesc).toBeTruthy()
        expect(w.legacy).toBeTruthy()
        expect(w.region).toBeTruthy()
      }
    })
  })

  describe('architecturalOrders', () => {
    it('has 3 orders', () => {
      expect(architecturalOrders).toHaveLength(3)
    })

    it('each order has required fields', () => {
      for (const o of architecturalOrders) {
        expect(o.id).toBeTruthy()
        expect(o.name).toBeTruthy()
        expect(o.originalName).toBeTruthy()
        expect(o.period).toBeTruthy()
        expect(o.origin).toBeTruthy()
        expect(o.shortDesc).toBeTruthy()
        expect(o.visualDescription).toBeTruthy()
        expect(o.characteristics.length).toBeGreaterThan(0)
        expect(o.examples.length).toBeGreaterThan(0)
      }
    })
  })

  describe('epochs', () => {
    it('has epochs', () => {
      expect(epochs.length).toBeGreaterThan(0)
    })

    it('each epoch has required fields', () => {
      for (const e of epochs) {
        expect(e.id).toBeTruthy()
        expect(e.name).toBeTruthy()
        expect(e.period).toBeTruthy()
        expect(e.shortDesc).toBeTruthy()
        expect(e.regions.length).toBeGreaterThan(0)
        expect(e.highlights.length).toBeGreaterThan(0)
      }
    })
  })

  describe('authorAnalysis', () => {
    it('has section title and author', () => {
      expect(authorAnalysis.sectionTitle).toBeTruthy()
      expect(authorAnalysis.author).toBeTruthy()
      expect(authorAnalysis.intro).toBeTruthy()
    })

    it('has sections', () => {
      expect(authorAnalysis.sections.length).toBeGreaterThan(0)
    })

    it('each section has required fields', () => {
      for (const s of authorAnalysis.sections) {
        expect(s.id).toBeTruthy()
        expect(s.title).toBeTruthy()
        expect(s.thesis).toBeTruthy()
        expect(s.body.length).toBeGreaterThan(0)
      }
    })
  })

  describe('FAQ_DATA', () => {
    it('has questions', () => {
      expect(FAQ_DATA.length).toBeGreaterThan(0)
    })

    it('each FAQ has question and answer', () => {
      for (const faq of FAQ_DATA) {
        expect(faq.question).toBeTruthy()
        expect(faq.answer).toBeTruthy()
      }
    })
  })
})
