// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License. See License.txt in the project root for license information.

package com.microsoft.commondatamodel.objectmodel.cdm.projection;

import com.microsoft.commondatamodel.objectmodel.TestHelper;
import com.microsoft.commondatamodel.objectmodel.TestUtils;
import com.microsoft.commondatamodel.objectmodel.cdm.CdmCorpusDefinition;
import com.microsoft.commondatamodel.objectmodel.cdm.CdmEntityDefinition;
import com.microsoft.commondatamodel.objectmodel.enums.CdmStatusLevel;
import org.testng.Assert;
import org.testng.annotations.Test;

import java.io.File;
import java.util.ArrayList;
import java.util.Arrays;

/**
 * Tests all the projections will not break the OM even if not implemented.
 */
public class ForwardCompatibilityTest {
    /**
     * The path between TestDataPath and TestName.
     */
    private static final String TESTS_SUBPATH =
            new File(new File(new File(
                    "cdm"),
                    "projection"),
                    "testForwardCompatibility")
                    .toString();

    /**
     * Tests running all the projections (includes projections that are not implemented).
     */
    @Test
    public void testAllOperations() throws InterruptedException {
        String testName = "testAllOperations";
        String entityName = "TestAllOperations";
        CdmCorpusDefinition corpus = TestHelper.getLocalCorpus(TESTS_SUBPATH, testName, null);
        corpus.setEventCallback((CdmStatusLevel level, String message) -> {
            if (!message.contains("Projection operation not implemented yet."))
                Assert.fail("Some unexpected failure - " + message + "!");
        }, CdmStatusLevel.Error);

        String expectedOutputPath = TestHelper.getExpectedOutputFolderPath(TESTS_SUBPATH, testName);

        CdmEntityDefinition entTestEntityStringReference = (CdmEntityDefinition) corpus.fetchObjectAsync("local:/" + entityName + ".cdm.json/" + entityName).join();
        Assert.assertNotNull(entTestEntityStringReference);
        CdmEntityDefinition resolvedTestEntityStringReference = TestUtils.getResolvedEntity(corpus, entTestEntityStringReference, new ArrayList<String>(Arrays.asList("referenceOnly"))).join();
        Assert.assertNotNull(resolvedTestEntityStringReference);
        AttributeContextUtil.validateAttributeContext(corpus, expectedOutputPath, entityName, resolvedTestEntityStringReference);
    }
}