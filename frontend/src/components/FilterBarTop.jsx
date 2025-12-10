import React from "react";
import { FiChevronDown, FiCalendar } from "react-icons/fi";
import * as Popover from "@radix-ui/react-popover";

function PillTrigger({ label }) {
  return (
    <div className="flex items-center gap-2 px-3 py-1.5 bg-white border rounded-lg shadow-sm cursor-pointer hover:bg-gray-50">
      <span className="text-sm text-gray-700">{label}</span>
      <FiChevronDown className="text-gray-500" />
    </div>
  );
}

export default function FilterBarTop({
  regions, genders, categories, payments,
  regionsValue, setRegions,
  gendersValue, setGenders,
  categoriesValue, setCategories,
  paymentsValue, setPayments,
  dateRange, setDateRange,
  tags, setTags,
  ageRange, setAgeRange,
  sortBy, setSortBy
}) {

  const toggle = (list, setter, v) => {
    if (list.includes(v)) setter(list.filter(x => x !== v));
    else setter([...list, v]);
  };

  return (
    <div className="w-full bg-white border rounded-xl p-4 shadow-sm mt-4">
      <div className="flex flex-wrap items-center gap-4">

        {/* -------------------- REGION -------------------- */}
        <Popover.Root>
          <Popover.Trigger>
            <PillTrigger label="Customer Region" />
          </Popover.Trigger>

          <Popover.Content sideOffset={6} className="bg-white border shadow-lg rounded-lg p-3 w-64 z-50">
            <div className="flex flex-col gap-2 text-sm">
              {regions.map(r => (
                <label key={r} className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={regionsValue.includes(r)}
                    onChange={() => toggle(regionsValue, setRegions, r)}
                  />
                  {r}
                </label>
              ))}
            </div>
          </Popover.Content>
        </Popover.Root>

        {/* -------------------- GENDER -------------------- */}
        <Popover.Root>
          <Popover.Trigger>
            <PillTrigger label="Gender" />
          </Popover.Trigger>

          <Popover.Content sideOffset={6} className="bg-white border shadow-lg rounded-lg p-3 w-48 z-50">
            {genders.map(g => (
              <label key={g} className="flex items-center gap-2 text-sm cursor-pointer">
                <input
                  type="checkbox"
                  checked={gendersValue.includes(g)}
                  onChange={() => toggle(gendersValue, setGenders, g)}
                />
                {g}
              </label>
            ))}
          </Popover.Content>
        </Popover.Root>

        {/* -------------------- AGE RANGE -------------------- */}
        <Popover.Root>
          <Popover.Trigger>
            <PillTrigger label="Age Range" />
          </Popover.Trigger>

          <Popover.Content sideOffset={6} className="bg-white border shadow-lg rounded-lg p-3 w-60 z-50">
            <div className="flex items-center gap-2">
              <input
                type="number"
                placeholder="Min"
                className="border rounded px-2 py-1 w-20 text-sm"
                value={ageRange.min}
                onChange={e => setAgeRange({ ...ageRange, min: e.target.value })}
              />
              <span className="text-gray-400">-</span>
              <input
                type="number"
                placeholder="Max"
                className="border rounded px-2 py-1 w-20 text-sm"
                value={ageRange.max}
                onChange={e => setAgeRange({ ...ageRange, max: e.target.value })}
              />
            </div>
          </Popover.Content>
        </Popover.Root>

        {/* -------------------- PRODUCT CATEGORY -------------------- */}
        <Popover.Root>
          <Popover.Trigger>
            <PillTrigger label="Product Category" />
          </Popover.Trigger>

          <Popover.Content sideOffset={6} className="bg-white border shadow-lg rounded-lg p-3 w-64 z-50">
            {categories.map(c => (
              <label key={c} className="flex items-center gap-2 text-sm cursor-pointer">
                <input
                  type="checkbox"
                  checked={categoriesValue.includes(c)}
                  onChange={() => toggle(categoriesValue, setCategories, c)}
                />
                {c}
              </label>
            ))}
          </Popover.Content>
        </Popover.Root>

        {/* -------------------- TAGS -------------------- */}
        <Popover.Root>
          <Popover.Trigger>
            <PillTrigger label="Tags" />
          </Popover.Trigger>

          <Popover.Content sideOffset={6} className="bg-white border shadow-lg rounded-lg p-3 w-60 z-50">
            <input
              type="text"
              placeholder="organic, casual"
              className="border w-full rounded px-2 py-1 text-sm"
              value={tags}
              onChange={e => setTags(e.target.value)}
            />
          </Popover.Content>
        </Popover.Root>

        {/* -------------------- PAYMENT METHOD -------------------- */}
        <Popover.Root>
          <Popover.Trigger>
            <PillTrigger label="Payment Method" />
          </Popover.Trigger>

          <Popover.Content sideOffset={6} className="bg-white border shadow-lg rounded-lg p-3 w-60 z-50">
            {payments.map(p => (
              <label key={p} className="flex items-center gap-2 text-sm cursor-pointer">
                <input
                  type="checkbox"
                  checked={paymentsValue.includes(p)}
                  onChange={() => toggle(paymentsValue, setPayments, p)}
                />
                {p}
              </label>
            ))}
          </Popover.Content>
        </Popover.Root>

        {/* -------------------- DATE RANGE -------------------- */}
        <Popover.Root>
          <Popover.Trigger>
            <PillTrigger label="Date" />
          </Popover.Trigger>

          <Popover.Content sideOffset={6} className="bg-white border shadow-lg rounded-lg p-3 w-72 z-50">
            <div className="flex items-center gap-2">
              <input
                type="date"
                className="border rounded px-2 py-1 text-sm"
                value={dateRange.from}
                onChange={e => setDateRange({ ...dateRange, from: e.target.value })}
              />
              <span className="text-gray-400">to</span>
              <input
                type="date"
                className="border rounded px-2 py-1 text-sm"
                value={dateRange.to}
                onChange={e => setDateRange({ ...dateRange, to: e.target.value })}
              />
              <FiCalendar className="text-gray-400" />
            </div>
          </Popover.Content>
        </Popover.Root>

      </div>
    </div>
  );
}

