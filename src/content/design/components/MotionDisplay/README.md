A simulation of the T-RGB panel running the display's motion: 23.5 steps a second, with the area each frame redraws.

Switch to "Opacity fades" to see why the current transitions look choppy: a cross-fade redraws and blends every pixel, takes about three scans a frame, and the panel holds the old picture meanwhile. The stepped version changes the same screens inside one scan a frame. The cost figures are estimates from measured full-screen frames, not measurements of these animations.
