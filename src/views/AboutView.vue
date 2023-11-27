<template>
    <div class="container py-3">
        <div class="d-flex align-items-baseline">
            <span class="h2">About</span>
        </div>
        <hr class="mt-1" />


        <ul class="nav nav-underline mt-4">
            <li class="nav-item">
                <button class="btn-link nav-link" :class="{ active: tabIndex === 0 }" aria-current="page"
                    @click="() => tabIndex = 0">General <span class="visually-hidden">Kenobi</span>Information</button>
            </li>
            <li class="nav-item">
                <button class="btn-link nav-link" :class="{ active: tabIndex === 1 }" @click="() => tabIndex = 1">Bot
                    Usage</button>
            </li>
        </ul>

        <template v-if="tabIndex === 0">
            <div class="card mt-4">
                <div class="card-body">
                    <h4 class="card-title">Data Sources</h4>
                    <ul>
                        <li><a href="https://www.aminer.org/citation" target="_blank">AMiner v14</a></li>
                        <li><a href="https://dblp.org/xml/" target="_blank">DBLP</a></li>
                        <li><a target="_blank"
                                href="https://www.crossref.org/blog/2023-public-data-file-now-available-with-new-and-improved-retrieval-options/">Crossref
                                (Dataset - 20.04.23)</a></li>
                        <li><a target="_blank" href="https://www.kaggle.com/datasets/Cornell-University/arxiv">arXiv
                                (cs.*)</a>
                        </li>
                    </ul>
                    <p>The AMiner and the arXiv dataset are used as a basis and then extended with DBLP. An attempt is made
                        to
                        fill in missing data with the Crossref dataset. Subsequently, all entries are filtered out that do
                        not
                        have a valid title, abstract, DOI, publication year. In addition, each entry can have a number on
                        how
                        often they have been cited, if available.</p>
                    <p>This leads to a total number of <strong>4153428</strong> publications in our database. A total
                        distribution of the available publications (per year) can be seen in each analysis result.</p>
                </div>
            </div>

            <div class="card mt-4">
                <div class="card-body">
                    <h4 class="card-title">Data Processing</h4>
                    <p>Each publication is converted into a vector embedding using the <a
                            href="https://huggingface.co/allenai/specter2_base">allenai/specter2</a> model and then inserted
                        into a <a href="https://weaviate.io/">weaviate</a> vetor database. For each query we get a set
                        amount (relative to each years total publication count) of publications, calculate the mean cosine
                        similarity and construct a popularity chart from that. This time-series is then used as a basis for
                        our trend
                        analysis.</p>
                </div>
            </div>

            <div class="card mt-4">
                <div class="card-body">
                    <h4 class="card-title">Data Quality</h4>
                    <p>Unfortunately, we are bound to the quality of our chosen scientific publication databases. We cannot
                        guarantee that your topic is adequately represented within these databases and subsequently cannot
                        guarantee that the trends we find are correct. But here are some positive examples:</p>
                    <ul>
                        <li>blockchain</li>
                        <li>machine learning deep learning</li>
                        <li>p2p network, bittorrent</li>
                        <li>ftp file sharing protocol</li>
                    </ul>
                </div>
            </div>

            <div class="card mt-4">
                <div class="card-body">
                    <h4 class="card-title">Trend analysis</h4>
                    <p>The trend analysis algorithm is based on Muggeos "Estimating regression models with unknown
                        break-points"
                        and Sen's Slope. It is completely separate to the weaviate database and vector embeddings.</p>
                </div>
            </div>

        </template>
        <template v-else>
            <div class="card mt-4">
                <div class="card-body">
                    <h4 class="card-title">Bot Usage</h4>
                    <p>The chat bot support three full text conversation paths and two quick commands.</p>

                    <hr />

                    <h5>Short commands</h5>
                    <ul>
                        <li><em><strong>!citrec</strong> topics</em> (Citation recommendation)</li>
                        <li><em><strong>!trends</strong> topics</em> (Trend analysis)</li>
                    </ul>

                    <p>Examples:</p>

                    <ul>
                        <li><em><strong>!citrec</strong> blockchain</em></li>
                        <li><em><strong>!trends</strong> machine learning, deep vision</em></li>
                    </ul>

                    <p>In addition I support several conversation paths that allow you to customize the search parameters:
                    </p>

                    <ul>
                        <li>Trend analysis
                            <ul>
                                <li><em>Start a trend analysis</em></li>
                                <li><em>Start trends</em></li>
                            </ul>
                        </li>
                        <li>Repeat trend analysis
                            <ul>
                                <li><em>Repeat last trend analysis</em></li>
                                <li><em>Repeat</em></li>
                            </ul>
                        </li>
                        <li>
                            Citation recommendation
                            <ul>
                                <li><em>Start a new citation recommendation</em></li>
                                <li><em>Start cit rec</em></li>
                            </ul>
                        </li>
                    </ul>

                    <hr />

                    <p>Apart from that, there are additional help commands that explain you how each parameter and command
                        works</p>

                    <ul>
                        <li><em>Help me</em></li>
                        <li><em>Explain the parameters</em></li>
                        <li><em>Explain the distance</em></li>
                        <li>etc.</li>
                    </ul>

                </div>
            </div>

            <div class="row mt-4 row-gap-3">
                <div class="col-12 col-md-6">
                    <div class="card">
                        <div class="card-header">
                            <i class="bi bi-chat-dots me-2"></i>
                            Example 1 - Short trend analysis
                        </div>
                        <div class="card-body">
                            <Conversation :messages="['<strong>!trends</strong> machine learning', '[Results...]']"
                                :bot-is-starting="false" />
                        </div>
                    </div>
                </div>
                <div class="col-12 col-md-6">
                    <div class="card">
                        <div class="card-header">
                            <i class="bi bi-chat-dots me-2"></i>
                            Example 2 - Short citation recommendation
                        </div>
                        <div class="card-body">
                            <Conversation
                                :messages="['<strong>!citrec</strong> time-series based trend detection', '[List of Recommendations ...]']"
                                :bot-is-starting="false" />
                        </div>
                    </div>
                </div>
                <div class="col-12 col-md-6">
                    <div class="card">
                        <div class="card-header">
                            <i class="bi bi-chat-dots me-2"></i>
                            Example 3 - Trend analysis
                        </div>
                        <div class="card-body">
                            <Conversation :messages="trendAnalysisConversation" :bot-is-starting="false" />
                        </div>
                    </div>
                </div>
                <div class="col-12 col-md-6">
                    <div class="card">
                        <div class="card-header">
                            <i class="bi bi-chat-dots me-2"></i>
                            Example 4 - Repeat aalysis
                        </div>
                        <div class="card-body">
                            <Conversation :messages="repeatAnalysisConversation" :bot-is-starting="true" />
                        </div>
                    </div>
                </div>
            </div>
        </template>
    </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import Conversation from '@/components/about/Conversation.vue';
import { useRoute } from 'vue-router';

const tabIndex = ref(0);

const trendAnalysisConversation = [
    "Start a trend analysis",
    `Ok, for which topics?<br/><br>Use the following format: <strong>!topics</strong> topic1, topic2, "Sentence, describing topic 3"`,
    "<strong>!topics</strong> blockchain",
    `Alright, I will analyse the following topics:<br>blockchain<br><br>What parameters (cutoff, time range, both) do you want to adjust? If you want to use the default settings, simply say "no".`,
    "Use cutoff 0.88",
    "Alright, I adjusted the cutoff to 0.89. Do you want to adjust the time range as well?",
    "no",
    "[Results]"
];

const repeatAnalysisConversation = [
    "[Results]",
    "Repeat the last analysis",
    "Sure, what parameters (cutoff, time range, both)  do you want to have adjusted?",
    "both",
    "As you wish. What cutoff should I use for the next analysis?",
    "0.92",
    "Okay, I adjusted the cutoff to 0.94. What time range should I consider?",
    "2000-2010",
    "[Results ...]"
]

const route = useRoute();

onMounted(() => {
    const tab = route.query.tab;
    if (tab === 'info') {
        tabIndex.value = 0;
    } else if (tab === 'bot') {
        tabIndex.value = 1;
    }
});
</script>