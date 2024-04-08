[![screenshot](https://raw.githubusercontent.com/johndimm/imdb-filter-panel/main/public/movies.png)](http://54.169.121.112:3001/)

This repo is about the React code that manages the filter panel on the left in this app.  Similar widgets are used by Amazon, Walmart, and many other sites.  The interface is a powerful way to reduce search results.  

## Installation

Requires:

- node
- react
- nextjs

Steps:

- clone the repo
- npm install
- npm run dev


## Toy Example

A toy example makes it easier to see what's going on.

[![toy example](https://github.com/johndimm/imdb-filter-panel/blob/main/public/example.png?raw=true)](http://54.169.121.112:3001/example)


## About the code

![](https://github.com/johndimm/imdb-filter-panel/blob/main/public/diagram.png?raw=true)

The code uses document masks, arrays of boolean values, one for each "document" in the database (user, movie, geometric object).  An entry is True if that item should be displayed according to this filter.  This makes it easy for the filters to work independently, but still react to changes in the states of other filters.

Each feature filter manages a single column of the input table defined by the csv file.

The idea is that each filter is master of its own domain.  No other filter know how it decides whether an item is in or out.  The communication with the outside world is through document masks.

The filter receives an input global document mask from the panel, representing the current state of all filters taken together by intersection.  The filter applies its selection process to the items that passed the global filter to count the number of items in each category.  

```jsx
// Generate the output mask.
		const outputMask = originalArray.map((record, idx) => {
			// If nothing is checked, it's as if everything were checked.
			if (checkedCategories.length === 0) return true

			if (isList) {
				return checkList(record[field])
			} else {
				return checkedCategories.includes(record[field])
			}
		})
```
When the user changes a checkbox selection, the filter sends its modified mask back up to the panel through a callback.  The panel recalculates the global mask over all records in the original array and React pushes the changed global document mask back down to the filters.

```jsx
                outputMasks[sourceIdx] = outputMask
		setoutputMasks(outputMasks)

		// Make a mask for each filter that merges all the other filter masks.
		const inputMasks = outputMasks.map((outputMask, filterIdx) => {
			return outputMask.map((val, idx) => {
				let allTrue = true
				for (var i = 0; i < outputMasks.length; i++) {
					if (i != filterIdx && !outputMasks[i][idx]) {
						allTrue = false
						break
					}
				}
				return allTrue
			})
		})

		setinputMasks(inputMasks)
```

It is important to avoid causing an update to the filter that caused the change in state for two reasons:  

- to avoid an infinite update loop and 
- because we want the originating filter to remain in place.  

Otherwise, the originating filter would be reduced to a single line.  By ignoring the original filter during the update, we allow the user to switch from one category to another with a single click.

## The goals of this approach:

- each filter shows the current counts based on user selections in other filters
- every link produces data, there are no dead links

## The flow:

- user clicks on a checkbox
- FeatureFilter calculates output mask
    - each filter does a pass through the database
- sends it to FilterPanel using callback
- FilterPanel receives output masks from all filters
- computes input mask for each filter
    - the intersection of all other output masks
        - not including the filter itself

- sends updated input masks down to each filter
- filters recompute their local counts over their own items


## Next steps:

- The document masks could be implemented as bitmasks, in which case the code to calculate the intersection of output masks is just a bitwise AND.  This would be a better approach, but I'm not sure it would produce a noticeable improvement on 5,000 items.

- Handle larger datasets by using the database to create document masks and match them to the data.  I would expect this to be less snappy but still have good performance.

- There is no attempt to deal with numeric ranges, and that is an important feature of e-commerce filter panels.