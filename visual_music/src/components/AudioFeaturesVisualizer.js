import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

const AudioFeaturesVisualizer = ({ audioFeatures }) => {
    const svgRef = useRef();

    useEffect(() => {
        if (!audioFeatures) return;

        const { tempo, danceability } = audioFeatures;
        const svg = d3.select(svgRef.current);

        // Clear SVG before redrawing
        svg.selectAll("*").remove();

        //  Display tempo as a simple bar
        svg.append('rect')
            .attr('width', tempo / 2) // Example scaling: 1 pixel per 2 BPM
            .attr('height', 50)
            .attr('fill', 'steelblue');

        // Display danceability as opacity of the bar
        svg.select('rect')
            .attr('opacity', danceability); // Using danceability directly, as it's a value between 0 and 1

    }, [audioFeatures]);

    return (
        <svg ref={svgRef} width="400" height="60"></svg>
    );
};

export default AudioFeaturesVisualizer;
