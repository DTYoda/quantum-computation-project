# Finishing Quantum Atlas for 15-455

The two largest gaps are the empty motivation chapter and the missing justification for computing a final amplitude in polynomial space. The existing draft already explains why a full state vector is expensive and why summing one output probability at a time would help. Resume there. The rubric treats the five categories holistically and requires student-authored explanatory text. Use these as revision questions and write the final exposition yourself.

## Context

- In Motivation, name the knowledge you expect from 15-455. Which facts about Boolean circuits, randomized TMs, circuit families, polynomial space and verifiers will you use? Point readers who need a refresher to the relevant Ada lecture.
- Introduce the prerequisite linear algebra in time for its first use. Can a reader interpret a column vector, squared magnitude, conjugate transpose and tensor product using your definitions or a specific reading?
- Explain why comparing quantum and randomized circuits matters. Choose one input for which an intermediate measurement would erase interference. Explain what prediction a reader would get wrong by treating amplitudes as coin-flip probabilities.
- Give your reason for using circuits and identify the question answered by the centerpiece theorem. Your original project outline can help you choose the order.

## Scope and depth

- Shape the material into two lecture-sized arcs. One natural stopping point is the definition of uniform bounded-error computation. The second arc can build from reversible classical simulation to the classical space upper bound and its implications.
- State the model once. Specify the permitted finite gate set, bounded gate arity, uniform generation, initialization and output convention. Check that the gate set implements the gates used in the exact simulations. Exact-computation claims can depend on this choice.
- For each result you omit, mark the omission where it occurs and cite the actual chapter, theorem, page or lecture passage you consulted. The seven bibliography entries identify your sources. The precise locators still need your verification, especially for the real-amplitude simulation, classical TM-to-circuit construction, query bounds and oracle separation.

## Clarity and correctness

### Complete the centerpiece proof

Use the questions below to check your own argument against the source you choose.

1. What does the amplitude for basis string z after t gates mean? Give the initial value on the input-plus-ancillas basis state and the recurrence for one further gate. Which predecessor strings can contribute when a gate acts on only a constant number of wires?
2. How will your simulation enumerate predecessors, compute their contributions and reuse memory? Count the recursion depth, wire indices, basis strings, counters and partial sums. Explain why the number of recursive calls affects running time differently from peak space.
3. Which gate entries can the classical simulator obtain and to what precision? Give a quantitative bound on the accumulated error over the gate sequence and the sum over accepting strings. Merely saying “polynomially many bits suffice” leaves the central numerical step open. An alternative is to choose a convenient exact path-counting representation for a justified gate set and handle its normalization explicitly.
4. With acceptance at most 1/3 or at least 2/3, what approximation error suffices for a comparison with 1/2? Tie your chosen precision to that margin. Account for constructing or accessing the uniform circuit description. Close by identifying the deterministic polynomial-space decider.

### Review the shorter arguments

- In the Pauli-X example, check the pair of amplitudes before and after the gate. In the no-cloning discussion, distinguish copying computational-basis labels from cloning an arbitrary unknown input state.
- In the reversible simulation, specify how repeated uses of a classical wire are scheduled. The polynomial-size simulation suffices for class containment. A constant-factor depth claim for unrestricted fan-out needs separate justification.
- Decide how to denote a circuit acting on a ket versus the classical bit obtained by measuring its output. Carry that convention from the bounded-error definition through BQP and QMA.
- Review exact acceptance versus deterministic intermediate evolution in EQP. State BPP = BQP and its hypothetical consequences for decision languages. In the HALT discussion, specify the computability assumption on gate entries.
- A proof about measurements of pure entangled states should specify the partition. A search query bound should identify the black-box model and the meaning of N. Check these whenever you compare results across models.

## Intuition

- Use the Bell circuit before discussing independent qubits. Ask the reader to predict both marginal distributions and then the joint distribution. Explain why the coefficient argument in your transcript establishes entanglement.
- Give a small, worked path-amplitude example in the centerpiece proof. What can cancel before squaring? Which final outcomes are mutually exclusive and can have their probabilities added? Show what stays in memory as one recursive branch returns and another begins.
- Before each major proof step, state what obstacle it resolves. End with what the containment tells a reader about space and what question remains about time.

## Organization

- Add a brief roadmap in your own voice to Motivation. Introduce the motivating question, point to the first worked example and tell the reader where it is answered or left open.
- Break the finished centerpiece proof into named claims for amplitude computation, precision and the decision step. Give each a short takeaway.
- End the final chapter by returning to your opening question. Name a proved containment, a speedup with its computational model, and an open equality. Invite the reader to locate each on the site.
- Before submitting, have a 455 classmate find the bounded-error definition from the proof, follow the Bell circuit, and explain why the PSPACE argument can spend exponential time. Their first point of confusion is a good place for your final prose edit.

## Editorial changes to check

The Google Doc is untouched. The site typesets your equations and normalizes a few phrases. In particular, it describes X as swapping amplitudes, qualifies the no-cloning and HALT claims, scopes the BPP equality discussion to decision problems, and omits the unsupported constant-factor depth assertion. Compare these passages with your original and supply your own final wording under the course authorship rule. The References page uses the seven entries you supplied. Confirm the intended lecture versions and pinpoint citations before submission.

The added Toffoli passage on the Definitions page is a drafted definition. The basis-state rule also appears in your theorem transcript. Finalize the explanatory wording in your own voice before submission.
