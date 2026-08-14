/* ==========================================================================
   Frontier Research and Innovation Foundation — WebMCP Browser Agent API
   ========================================================================== */

(function () {
  'use strict';

  function initWebMCP() {
    if (typeof window === 'undefined') return;

    const webMcpTools = [
      {
        name: "search_programs",
        description: "Search research programs, health initiatives, and community relief pillars of Frontier Research Foundation.",
        inputSchema: {
          type: "object",
          properties: {
            category: {
              type: "string",
              description: "Category filter (research, health, education, relief, all)"
            }
          }
        },
        execute: async (args) => {
          const category = (args && args.category) || 'all';
          return {
            status: "success",
            programs_url: "https://www.frinf.org/programs.html",
            category: category,
            message: `Filtered programs for category '${category}'`
          };
        }
      },
      {
        name: "get_executive_committee",
        description: "Retrieve Executive Committee directory of Pransikha Foundation.",
        inputSchema: {
          type: "object",
          properties: {
            section: {
              type: "string",
              description: "Filter section (governing, secretariat, all)"
            }
          }
        },
        execute: async (args) => {
          return {
            status: "success",
            committee_url: "https://www.frinf.org/committee.html",
            total_members: 7,
            officers: ["Tufael (President)", "Md. Rezaul Haque (Vice President)", "Muhammad Faisal Azim (General Secretary)", "Md Soib Uddin (Joint Secretary)", "Suhel Ahmed (Treasurer)", "Mahmudur Rahman (Social Secretary)", "Nirmal Chandra Mahat (Office Secretary)"]
          };
        }
      },
      {
        name: "get_secretariat_contact",
        description: "Get office address, phone number, and location map of the foundation secretariat.",
        inputSchema: {
          type: "object",
          properties: {}
        },
        execute: async () => {
          return {
            address: "UHUD Mayer Badhon, 84/V/9/1, Jafrabad, Mohammadpur, Dhaka -1207, Bangladesh",
            phone: "+880 1712 131931",
            email: "info@frinf.org",
            maps_url: "https://maps.app.goo.gl/faGBMASAWX87GP3j6"
          };
        }
      }
    ];

    // Standard WebMCP provision call if browser supports navigator.modelContext
    if (navigator.modelContext && typeof navigator.modelContext.provideContext === 'function') {
      try {
        navigator.modelContext.provideContext({
          tools: webMcpTools
        });
        console.log('[WebMCP] Successfully registered site tools via navigator.modelContext.');
      } catch (err) {
        console.warn('[WebMCP] Integration error:', err);
      }
    } else {
      // Expose fallback window object for AI agents inspecting browser DOM
      window.__webMcpContext = {
        tools: webMcpTools
      };
      console.log('[WebMCP] WebMCP polyfill initialized at window.__webMcpContext');
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initWebMCP);
  } else {
    initWebMCP();
  }
})();
