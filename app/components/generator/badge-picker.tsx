'use client';

import { useState, useMemo } from 'react';
import { Search, X, Layers, Check } from 'lucide-react';
import type { BadgeCategory, BadgeStyle } from '@/lib/types';
import { BADGE_CATEGORIES, searchBadges, TECH_BADGES, generateBadgeUrl } from '@/lib/badge-catalog';
import styles from './badge-picker.module.css';

interface BadgePickerProps {
  selectedIds: string[];
  style: BadgeStyle;
  onChange: (ids: string[]) => void;
  onStyleChange: (style: BadgeStyle) => void;
}

export function BadgePicker({
  selectedIds,
  style,
  onChange,
  onStyleChange,
}: BadgePickerProps) {
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState<BadgeCategory | 'all'>('all');

  const filteredBadges = useMemo(() => {
    return searchBadges(search, activeCategory === 'all' ? undefined : activeCategory);
  }, [search, activeCategory]);

  const selectedBadgesList = useMemo(() => {
    return selectedIds
      .map((id) => TECH_BADGES.find((b) => b.id === id))
      .filter((b): b is typeof TECH_BADGES[number] => Boolean(b));
  }, [selectedIds]);

  const toggleBadge = (id: string) => {
    if (selectedIds.includes(id)) {
      onChange(selectedIds.filter((item) => item !== id));
    } else {
      onChange([...selectedIds, id]);
    }
  };

  const clearAll = () => {
    onChange([]);
  };

  return (
    <div className={styles.container}>
      {/* Top bar: Style selector & Quick info */}
      <div className={styles.headerRow}>
        <div className={styles.styleSelector}>
          <span className={styles.styleLabel}>
            <Layers size={14} /> Style:
          </span>
          {(['for-the-badge', 'flat-square', 'flat', 'plastic'] as BadgeStyle[]).map((st) => (
            <button
              key={st}
              type="button"
              className={[styles.styleBtn, style === st ? styles.styleActive : ''].join(' ')}
              onClick={() => onStyleChange(st)}
            >
              {st}
            </button>
          ))}
        </div>

        {selectedIds.length > 0 && (
          <button type="button" className={styles.clearBtn} onClick={clearAll}>
            Clear all ({selectedIds.length})
          </button>
        )}
      </div>

      {/* Selected Badges live chips */}
      {selectedBadgesList.length > 0 && (
        <div className={styles.selectedSection}>
          <p className={styles.selectedTitle}>Selected Badges ({selectedBadgesList.length})</p>
          <div className={styles.selectedGrid}>
            {selectedBadgesList.map((badge) => (
              <button
                key={badge.id}
                type="button"
                className={styles.selectedChip}
                onClick={() => toggleBadge(badge.id)}
                title={`Remove ${badge.name}`}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={generateBadgeUrl(badge, style)}
                  alt={badge.name}
                  className={styles.badgeImg}
                  loading="lazy"
                />
                <span className={styles.chipRemove}>
                  <X size={12} />
                </span>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Search and Category Filters */}
      <div className={styles.searchBar}>
        <Search size={16} className={styles.searchIcon} />
        <input
          type="text"
          placeholder="Search 80+ technologies (e.g. React, Docker, Python)..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className={styles.searchInput}
        />
        {search && (
          <button type="button" className={styles.searchClear} onClick={() => setSearch('')}>
            <X size={14} />
          </button>
        )}
      </div>

      <div className={styles.categories}>
        <button
          type="button"
          className={[styles.catBtn, activeCategory === 'all' ? styles.catActive : ''].join(' ')}
          onClick={() => setActiveCategory('all')}
        >
          All
        </button>
        {BADGE_CATEGORIES.map((cat) => (
          <button
            key={cat.id}
            type="button"
            className={[styles.catBtn, activeCategory === cat.id ? styles.catActive : ''].join(' ')}
            onClick={() => setActiveCategory(cat.id)}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Available Badges Grid */}
      <div className={styles.badgeGrid}>
        {filteredBadges.map((badge) => {
          const isSelected = selectedIds.includes(badge.id);
          return (
            <button
              key={badge.id}
              type="button"
              className={[styles.badgeCard, isSelected ? styles.badgeSelected : ''].join(' ')}
              onClick={() => toggleBadge(badge.id)}
              aria-pressed={isSelected}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={generateBadgeUrl(badge, style)}
                alt={badge.name}
                className={styles.badgeImg}
                loading="lazy"
              />
              <span className={styles.badgeCheck}>
                {isSelected ? <Check size={14} /> : null}
              </span>
            </button>
          );
        })}
      </div>

      {filteredBadges.length === 0 && (
        <p className={styles.empty}>No technologies found matching &ldquo;{search}&rdquo;</p>
      )}
    </div>
  );
}
